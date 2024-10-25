# Mesh v1 PoC

This repository represents a proof-of-concept for the upgrade to [Mesh v1](https://the-guild.dev/graphql/mesh) from the existing v0 we're using.

## Structure

This repo consists of three dummy apps (`appointments`, `customers` and `sales`) exposing a GraphQL
interface - those are our test subschemas / upstream services.

The `auth` directory contains an authentication service which exposes a JSON Web Key Set and
generates some tokens to test JWT handling.

The `gateway` directory contains the gateway config and the `nginx` directory contains the configuration of the reverse proxy exposing the gateway over HTTP/2.

Finally, the `web-client` directory contains a SPA application that showcases subscriptions over SSE and compares running them over HTTP 1.1 vs HTTP/2.

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

The gateway is also deployed via Docker Compose and available [here](http://localhost:4001/graphql) in case you don't need to run it in dev mode.

There's also a demo SPA application deployed [here](http://localhost:8080/).

Since the demo compares subscriptions using HTTP 1.1 and HTTP/2, and the latter requires TLS, to make the demo work you need to do **ONE** of two things:

### Option 1: `allow-insecure-localhost`

If using Chrome, enable the flag [allow-insecure-localhost](chrome://flags/#allow-insecure-localhost) for the time you use the demo app.

### Option 2: import the certificate

If using MacOS, import the self-signed certificate used in the app via:

```bash
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain nginx/ssl/nginx.der`
```

And remember to remove it later by opening the Keychain Access app, navigating to the System keychain, looking up the "localhost" certificate and deleting it.
