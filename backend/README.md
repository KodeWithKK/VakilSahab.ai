# How to run backend using docker

- Make sure you set `backend` folder as the current working directory

## Build Image

```shell
docker-compose build
```

## Spin up Container

```shell
# With Terminal Attached
docker-compose up

# With Terminal Detached
docker-compose up -d
```

## Spin down Container

```shell
docker-compose down
```

# How to run backend locally

- Make sure you set `backend` folder as the current working directory

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
