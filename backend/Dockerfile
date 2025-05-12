# Use the uv base image with Python 3.11
FROM ghcr.io/astral-sh/uv:python3.11-bookworm-slim

# Set environment variables for uv
ENV UV_LINK_MODE=copy \
    PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Copy dependency files
COPY pyproject.toml uv.lock ./

# Install dependencies without installing the project itself
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-install-project --no-dev

# Copy the rest of the application code
COPY . .

# Install project dependencies
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-dev

# Expose the application port
EXPOSE 8000

# run your application
CMD ["python", "main.py"]
