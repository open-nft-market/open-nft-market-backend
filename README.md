# Open Nft Marketplace Backend

A backend API that serves a NFT marketplace web app

## Technologies used

- NestJS
- Postgres
- Redis
- Subgraph

## Setup

- Clone the repo

```bash
$ npm install
```

## Running the app

- Make sure to have _Postgres_ and _Redis_ installed
- Copy `.env.example` to `.env ` then set the port
- Setup database credential in `.env`
- Install packages: `npm install` or `yarn install`
- Migrate the database: `npm run migrate:run` or `yarn migrate:run`
- Run the app: `npm run stat:dev` or `yarn start:dev`

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
