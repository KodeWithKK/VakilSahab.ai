variable "database_url" {
  description = "PSQL Database connection URL"
  type        = string
}

variable "frontend_origin" {
  description = "Frontend origin URL"
  type        = string
}

variable "environment" {
  description = "Deployment environment (dev, prod)"
  type        = string
}

variable "gemini_api_key" {
  description = "API key for the Gemini model"
  type        = string
  sensitive   = true
}

variable "mistral_api_key" {
  description = "API key for the Mistral model"
  type        = string
  sensitive   = true
}

variable "pinecone_api_key" {
  description = "API key for Pinecone"
  type        = string
  sensitive   = true
}

variable "pinecone_index_name" {
  description = "Name of the Pinecone index"
  type        = string
  default     = "legal-chatot-index"
}

variable "redis_url" {
  description = "Redis connection URL"
  type        = string
}

variable "clerk_secret_key" {
  description = "Clerk secret key"
  type        = string
  sensitive   = true
}

variable "clerk_frontend_api_url" {
  description = "Clerk frontend API URL"
  type        = string
}
