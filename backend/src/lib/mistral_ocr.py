import base64

from mistralai import Mistral
from src.core.config import settings

mistral_client = Mistral(api_key=settings.MISTRAL_API_KEY)


def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


async def mistral_ocr_on_image(image_path: str) -> str:
    base64_image = encode_image(image_path)
    response = mistral_client.ocr.process(
        model="mistral-ocr-latest",
        document={
            "type": "image_url",
            "image_url": f"data:image/jpeg;base64,{base64_image}",
        },
    )
    return "\n\n".join(page.markdown for page in response.pages)
