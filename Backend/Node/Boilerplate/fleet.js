const fs = require('fs')
const { Command } = require('commander')
const { createUser } = require('./build/App/controllers/userController')
const { parkVehicule } = require('./build/App/controllers/vehiculeController')
const {
    createFleet,
    registerVehiculeToFleet,
} = require('./build/App/controllers/fleetController')

const program = new Command()

program
    .name('fleet-manager')
    .description('CLI to manage my entire fleet')
    .version('0.0.0')

program
    .command('create')
    .description('Create a new fleet for a user')
    .argument('<userId>', 'user id')
    .action(async (str) => {
        if (Number.isNaN(Number(str))) {
            console.log('Argument should be a number')
            return
        }
        const user = await createUser(Number(str))
        const fleet = await createFleet(user.id)
        console.log('Fleet id: ', fleet.id)
    })

program
    .command('register-vehicule')
    .description('Register a vehicule to a fleet')
    .argument('<fleetId>', 'fleet id')
    .argument('<vehiculePlateNumber>', 'vehicule plate number')
    .action(async (fleetId, plateNumber) => {
        if (Number.isNaN(Number(fleetId))) {
            console.log('1st argument (fleet id) should be of type number')
            return
        }
        const fleet = await registerVehiculeToFleet(
            Number(fleetId),
            plateNumber
        )
        console.log(fleet)
    })

program
    .command('localize-vehicle')
    .description('Localize a vehicule')
    .argument('<fleetId>', 'fleet id')
    .argument('<vehiculePlateNumber>', 'vehicule plate number')
    .argument('<latitude>', 'latitude')
    .argument('<longitude>', 'longitude')
    .action(async (fleetId, plateNumber, lat, lon) => {
        if (Number.isNaN(Number(fleetId))) {
            console.log('1st argument (fleet id) should be of type number')
            return
        }
        const latitudeReg = new RegExp(
            /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/
        )
        const longitudeReg = new RegExp(
            /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/
        )
        if (!latitudeReg.test(lat) || !longitudeReg.test(lon)) {
            console.log('Check longitude and latitude failed')
            return
        }
        const vehicule = await parkVehicule(plateNumber, {
            latitude: lat,
            longitude: lon,
        })

        console.log(vehicule)
    })

program.parse()
