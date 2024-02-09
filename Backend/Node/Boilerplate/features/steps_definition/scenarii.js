const assert = require('assert')
const { Given, When, Then, BeforeAll } = require('@cucumber/cucumber')
const { prisma } = require('../../build/prisma')
const {
    createFleet,
    registerVehiculeToFleet,
} = require('../../build/App/controllers/fleetController')
const { createUser } = require('../../build/App/controllers/userController')
const {
    createVehicule,
    parkVehicule,
} = require('../../build/App/controllers/vehiculeController')

BeforeAll(async () => {
    await prisma.fleet.deleteMany()
    await prisma.vehicule.deleteMany()
    await prisma.user.deleteMany()
})

// Scenario: I can register a vehicle
Given('my fleet', async () => {
    this.user1 = await createUser(1)
    this.user1_fleet = await createFleet(this.user1.id)
})

Given('a vehicle', async () => {
    this.vehicule = await createVehicule('moto', 'abc')
})

// succesfully register a vehicule
When('I register this vehicle into my fleet', async () => {
    this.result = await registerVehiculeToFleet(
        this.user1_fleet.id,
        this.vehicule.plate
    )
})

Then('this vehicle should be part of my vehicle fleet', () => {
    assert.deepEqual(this.result.vehicules, [this.vehicule])
})

// Try to register twice
Given('I have registered this vehicle into my fleet', async () => {
    this.vehicule = await createVehicule('car', 'def')
    await registerVehiculeToFleet(this.user1_fleet.id, this.vehicule.plate)
})

When('I try to register this vehicle into my fleet', async () => {
    this.result = await registerVehiculeToFleet(
        this.user1_fleet.id,
        this.vehicule.plate
    )
})

Then(
    'I should be informed this this vehicle has already been registered into my fleet',
    () => {
        assert.strictEqual(this.result, 'Vehicule already registered')
    }
)

// // Same vehicle can belong to more than one fleet

Given('the fleet of another user', async () => {
    this.user2 = await createUser(2)
    this.user2_fleet = await createFleet(this.user2.id)
})

Given(
    "this vehicle has been registered into the other user's fleet",
    async () => {
        await registerVehiculeToFleet(this.user2_fleet.id, this.vehicule.plate)
    }
)

// park a vehicule
// Scenarion Succesfully park a vehicule

Given('a location', () => {
    this.location = { latitude: '1', longitude: '1' }
})

When('I park my vehicle at this location', async () => {
    this.vehicule = await createVehicule('truck', 'ghi')
    this.vehicule = await parkVehicule(this.vehicule.plate, this.location)
})

Then(
    'the known location of my vehicle should verify this location',
    async () => {
        assert.deepEqual(
            {
                latitude: this.vehicule.latitude,
                longitude: this.vehicule.longitude,
            },
            this.location
        )
    }
)

// Scenarion Can't localize my vehicle to the same location two times in a row
Given('my vehicle has been parked into this location', async () => {
    await parkVehicule(this.vehicule.plate, this.location)
})

When('I try to park my vehicle at this location', async () => {
    this.result = await parkVehicule(this.vehicule.plate, this.location)
})

Then(
    'I should be informed that my vehicle is already parked at this location',
    () => {
        assert.equal(this.result, 'Vehicle is already parked at this location')
    }
)
