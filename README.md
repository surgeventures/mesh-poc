# Mesh PoC

This repository represents a proof-of-concept for [Mesh](https://the-guild.dev/graphql/mesh) as a GraphQL gateway to all of our microservices.

## Structure

This repo consists of three dummy apps:

- _Appointments_ - exposes an OpenAPI interface
- _Customers_ - exposes a gRPC interface
- _Sales_ - exposes a GraphQL interface

The fourth directory - `gateway` - contains the Mesh gateway setup. Check the `.meshrc.yaml` file for details.

## Setup

Start up the dependencies:

```
docker compose up -d
```

Then run the gateway in dev mode:

```
cd gateway
npm install
npx mesh dev
```

This will open Mesh on [http://localhost:3000/graphql](http://localhost:3000/graphql) with all sub-schemas loaded.
