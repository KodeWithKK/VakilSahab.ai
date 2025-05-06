from langchain.text_splitter import RecursiveCharacterTextSplitter


def split_chunks(text, chunk_size=500):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size, chunk_overlap=50
    )
    return text_splitter.split_text(text)
