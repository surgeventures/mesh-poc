# Mesh v1 PoC

This repository represents a proof-of-concept for the upgrade to [Mesh v1](https://the-guild.dev/graphql/mesh) from the existing v0 we're using.

## Structure

This repo consists of three dummy apps (`appointments`, `customers` and `sales`) exposing a GraphQL
interface - those are our test subschemas / upstream services.

The `auth` directory contains an authentication service which exposes a JSON Web Key Set and
generates some tokens to test JWT handling.

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

If you change the upstream services' schemas, you will need to rebuild the composed schema:

```
npx mesh-compose > supergraph.graphql
```
