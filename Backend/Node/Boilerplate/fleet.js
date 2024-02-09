const fs = require('fs')
const { Command } = require('commander')
const { createUser } = require('./build/App/controllers/userController')
const {
    createVehicule,
    parkVehicule,
} = require('./build/App/controllers/vehiculeController')
const {
    createFleet,
    registerVehiculeToFleet,
} = require('./build/App/controllers/fleetController')

const pathToFleetController = 'build/App/controllers/fleetController.js'
const pathToUserController = 'build/App/controllers/userController.js'
const pathToVehiculeController = 'build/App/controllers/vehiculeController.js'

function checkBuildFolder() {
    if (!fs.existsSync('build/')) {
        return false
    }
    const filesExists =
        fs.existsSync(pathToUserController) &&
        fs.existsSync(pathToFleetController) &&
        fs.existsSync(pathToVehiculeController)
    if (!filesExists) {
        return false
    }
    return true
}

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
        if (!checkBuildFolder()) {
            console.log('run yarn build before use that command')
            return
        }
        if (Number.isNaN(Number(str))) {
            console.log('Argument should be a number')
            return
        }
        const user = await createUser(Number(str))
        console.log(user)
    })

program
    .command('register-vehicule')
    .description('Register a vehicule to a fleet')
    .argument('<fleetId>', 'fleet id')
    .argument('<vehiculePlateNumber>', 'vehicule plate number')
    .action((arg1, arg2) => {
        console.log(arg1, arg2)
    })

program
    .command('localize-vehicle')
    .description('Localize a vehicule')
    .argument('<fleetId>', 'fleet id')
    .argument('<vehiculePlateNumber>', 'vehicule plate number')
    .action((arg1, arg2) => {
        console.log(arg1, arg2)
    })

program.parse()
