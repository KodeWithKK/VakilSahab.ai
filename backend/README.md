# How to run the project

## Set Current Directory

- make sure you set current directory as the `backend` folder directory

## Install uv

- See the [Installation Guide](https://docs.astral.sh/uv/getting-started/installation/)

## Install Dependencies

- Recommended Way

```shell
uv sync
```

- Other way

```shell
uv pip install -r pyproject.toml
```

## Run Server

```shell
uv run main.py
```

## View API Swagger Docs

- Visit http://localhost:8000/docs
