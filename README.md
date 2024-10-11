# Mesh v1 PoC

This repository represents a proof-of-concept for the upgrade to [Mesh v1](https://the-guild.dev/graphql/mesh) from the existing v0 we're using.

## Structure

This repo consists of three dummy apps (`appointments`, `customers` and `sales`) exposing a GraphQL
interface - those are our test subschemas / upstream services.

The `auth` directory contains an authentication service which exposes a JSON Web Key Set and
generates some tokens to test JWT handling.

Finally, the `gateway` directory contains the gateway config.

## Setup

Make sure you have:

- ASDF
- Docker and Docker Compose

First, run the subgraph services:

```
docker compose up -d
```

After they successfully boot up, you should be able to navigate to their GraphiQL interfaces:

- [appointments](http://localhost:3001/graphql)
- [customers](http://localhost:3002/graphql)
- [sales](http://localhost:3003/graphql)

You can also access the auth service:

- [JSON Web Key Set](http://localhost:3004/jwks)
- [example JWTs](http://localhost:3004/tokens)

Then, run the gateway:

```
cd gateway
asdf install
npm i
npx hive-gateway supergraph
```

You should then be able to access the [API Gateway GraphiQL interface](http://localhost:4000/graphql).

By default NOT passing a JWT will let the request run successfully, but if you pass an invalid JWT,
the gateway will block the request.

In case you need to re-build the gateway schema (e.g. after changing one of the subschemas), run:

```
npx mesh-compose > supergraph.graphql
```
