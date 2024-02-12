# SETUP

Make sure to be in the `Boilerplate/` folder and:

-   Run `yarn install`.
-   Run `cp .env.example .env` (no need to change anything)
-   Run `npx prisma migrate dev --name init --schema=src/Infra/prisma/schema.prisma`.
-   And finally `yarn build`

You ready to use the project now.

## Things you can do

-   Run `yarn test` to check the scenarii running
-   Run `node ./fleet.js <args>` to use the CLI
