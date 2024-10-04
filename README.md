# Mesh v1 PoC

This repository represents a proof-of-concept for the upgrade to [Mesh v1](https://the-guild.dev/graphql/mesh) from the existing v0 we're using.

## Structure

This repo consists of three dummy apps:

- _Appointments_ - exposes an OpenAPI interface
- _Customers_ - exposes a gRPC interface
- _Sales_ - exposes a GraphQL interface

## Setup

Make sure you have:

- ASDF
- Docker and Docker Compose

First, run the subgraph services:

```
docker compose up -d
```

Then, run the gateway:

```
cd gateway
asdf install
npm i
npx hive-gateway supergraph
```
