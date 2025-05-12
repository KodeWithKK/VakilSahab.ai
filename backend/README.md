# Docker Guide

- make sure you set current directory as the `backend` folder directory

## Build Image

```shell
docker-compose build
```

## Spin up Container

```shell
# With Attached Terminal
docker-compose up

# With Detached Terminal
docker-compose up -d
```

## Spin down Container

```shell
docker-compose down
```

# How to run the project

- make sure you set current directory as the `backend` folder directory

## Install uv

- See the [Installation Guide](https://docs.astral.sh/uv/getting-started/installation/)

## Install Dependencies

```shell
# Recommended Way
uv sync

# Other way
uv pip install -r pyproject.toml
```

## Run Server

```shell
uv run main.py
```

## View API Swagger Docs

- Visit http://localhost:8000/docs
