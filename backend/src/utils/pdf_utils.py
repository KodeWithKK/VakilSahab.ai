import os
import shutil

import fitz  # PyMuPDF
from PIL import Image


def extract_text_from_pdf_direct(pdf_path):
    pdf_document = fitz.open(pdf_path)
    full_text = ""
    for page_num in range(len(pdf_document)):
        page = pdf_document.load_page(page_num)
        full_text += page.get_text("text") + "\n"
    pdf_document.close()
    return full_text


def pdf_to_images(pdf_path, output_folder):
    if os.path.exists(output_folder):
        shutil.rmtree(output_folder)
    os.makedirs(output_folder)

    pdf_doc = fitz.open(pdf_path)
    for page_number in range(len(pdf_doc)):
        page = pdf_doc.load_page(page_number)
        pix = page.get_pixmap()
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        img.save(os.path.join(output_folder, f"page_{page_number + 1}.png"))

    return output_folder
