terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.0.0"
    }
  }

  backend "s3" {
    bucket       = "k3-tfstates"
    key          = "vakilsahab/terraform.tfstate"
    region       = "ap-south-1"
    encrypt      = true
    use_lockfile = true
  }
}

provider "aws" {
  region = "ap-south-1"
}

# --- ECR Repository ---
resource "aws_ecr_repository" "lambda_ecr_repo" {
  name                 = "vakilsahab-backend"
  image_tag_mutability = "MUTABLE"
  force_delete         = true
}

resource "aws_ecr_lifecycle_policy" "ecr_lifecycle" {
  repository = aws_ecr_repository.lambda_ecr_repo.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep only the newest image"
        selection = {
          tagStatus   = "any"
          countType   = "imageCountMoreThan"
          countNumber = 1
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}

# --- IAM Role for Lambda ---
resource "aws_iam_role" "lambda_exec_role" {
  name = "vakilsahab-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })

  lifecycle {
    ignore_changes = [name] # in case name was already created manually
  }
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}


# --- Lambda Function ---
resource "aws_lambda_function" "fastapi_func" {
  function_name = "vakilsahab-lambda"
  role          = aws_iam_role.lambda_exec_role.arn
  package_type  = "Image"
  image_uri     = "${aws_ecr_repository.lambda_ecr_repo.repository_url}:${var.ecr_img_tag}"
  timeout       = 60
  memory_size   = 1024

  environment {
    variables = {
      DATABASE_URL           = var.database_url
      FRONTEND_ORIGIN        = var.frontend_origin
      ENVIRONMENT            = var.environment
      GEMINI_API_KEY         = var.gemini_api_key
      MISTRAL_API_KEY        = var.mistral_api_key
      PINECONE_API_KEY       = var.pinecone_api_key
      PINECONE_INDEX_NAME    = var.pinecone_index_name
      REDIS_URL              = var.redis_url
      CLERK_FRONTEND_API_URL = var.clerk_frontend_api_url
    }
  }

  depends_on = [aws_ecr_repository.lambda_ecr_repo]

  lifecycle {
    ignore_changes = [image_uri]
  }
}

# --- Lambda Function URL ---
resource "aws_lambda_function_url" "fastapi_url" {
  function_name      = aws_lambda_function.fastapi_func.function_name
  authorization_type = "NONE"
}
