FROM ghcr.io/astral-sh/uv:latest AS uv

FROM public.ecr.aws/lambda/python:3.11 AS builder

ENV UV_COMPILE_BYTECODE=1
ENV UV_NO_INSTALLER_METADATA=1
ENV UV_LINK_MODE=copy

COPY --from=uv /uv /bin/uv

WORKDIR /app

COPY uv.lock pyproject.toml requirements.txt  ./

# RUN uv export --frozen --no-emit-workspace --no-dev --no-editable -o requirements.txt && \
#     uv pip install -r requirements.txt --target "${LAMBDA_TASK_ROOT}"

RUN uv pip install -r requirements.txt \
    --extra-index-url https://download.pytorch.org/whl/cpu \
    --target "${LAMBDA_TASK_ROOT}"


FROM public.ecr.aws/lambda/python:3.11

COPY --from=builder ${LAMBDA_TASK_ROOT} ${LAMBDA_TASK_ROOT}
COPY . ${LAMBDA_TASK_ROOT}

CMD ["lambda_handler.handler"]
