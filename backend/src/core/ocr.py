import os
import shutil

from src.lib.mistral_ocr import mistral_ocr_on_image
from src.lib.pdf_utils import extract_text_from_pdf_direct, pdf_to_images


async def extract_text_from_file(file_path, file_name, session_id):
    if file_name.lower().endswith(".pdf"):
        extracted_text = extract_text_from_pdf_direct(file_path)
        if not extracted_text.strip():
            image_folder = pdf_to_images(file_path, f"tmp/{session_id}_images")
            extracted_text = ""
            for img_name in sorted(os.listdir(image_folder)):
                img_path = os.path.join(image_folder, img_name)
                extracted_text += await mistral_ocr_on_image(img_path) + "\n"
            shutil.rmtree(image_folder, ignore_errors=True)
    else:
        extracted_text = await mistral_ocr_on_image(file_path)

    return extracted_text
