FROM ghcr.io/astral-sh/uv:python3.11-bookworm-slim

# Work directory
WORKDIR /app

# Enable bytecode compilation + cache-friendly copy mode
ENV UV_COMPILE_BYTECODE=1
ENV UV_LINK_MODE=copy

# First, install just the dependencies
COPY pyproject.toml uv.lock ./

RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-install-project --no-dev

# Then, copy project source and install it
COPY . .

RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-dev

# Expose FastAPI port
EXPOSE 8000

# Set venv to PATH manually
ENV PATH="/app/.venv/bin:$PATH"

# Reset entrypoint to allow direct command execution (no uv entrypoint)
ENTRYPOINT []

# Run your main script via uvicorn
CMD ["python", "main.py"]
