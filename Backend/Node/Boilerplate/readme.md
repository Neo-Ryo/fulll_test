# SETUP

Make sure to be in the `Boilerplate/` folder and:

-   Run `yarn install`.
-   Run `cp .env.example .env` (no need to change anything)
-   Run `yarn prisma:migrate`.
-   And finally `yarn build`

You are ready to use the project now.

## Things you can do

-   Run `yarn test` to check the scenarii running
-   Use the fleet CLI:

    -   Run `node ./fleet.js create <UserId>`
    -   Run `node ./fleet register-vehicle <fleetId> <vehiclePlateNumber>`
    -   Run `node ./fleet localize-vehicle <fleetId> <vehiclePlateNumber> <latitude> <longitude>`
