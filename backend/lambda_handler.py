from mangum import Mangum
from src.app import app

# Initialize the Mangum handler for AWS Lambda
handler = Mangum(app, lifespan="off")
