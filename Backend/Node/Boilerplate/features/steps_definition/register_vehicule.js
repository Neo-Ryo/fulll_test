const assert = require('assert')
const { Given, When, Then } = require('@cucumber/cucumber')
const {
    createFleet,
    registerVehiculeToFleet,
} = require('../../build/App/fleetController')
const { createUser } = require('../../build/App/userController')
const {
    createVehicule,
    parkVehicule,
} = require('../../build/App/vehiculeController')

// Scenario: I can register a vehicle
Given('my fleet', () => {
    this.user1 = createUser()
    this.user1_fleet = createFleet(this.user1)
})

Given('a vehicle', () => {
    this.vehicule = createVehicule('moto', 'abc')
})

// succesfully register a vehicule
When('I register this vehicle into my fleet', () => {
    this.result = registerVehiculeToFleet(this.user1_fleet, this.vehicule)
})

Then('this vehicle should be part of my vehicle fleet', () => {
    assert.deepEqual(this.result, this.user1_fleet.vehicules)
})

// Try to register twice
Given('I have registered this vehicle into my fleet', () => {
    this.result = registerVehiculeToFleet(this.user1_fleet, this.vehicule)
})

When('I try to register this vehicle into my fleet', () => {
    this.result = registerVehiculeToFleet(this.user1_fleet, this.vehicule)
})

Then(
    'I should be informed this this vehicle has already been registered into my fleet',
    () => {
        assert.strictEqual(this.result, 'Vehicule already registered')
    }
)

// Same vehicle can belong to more than one fleet

Given('the fleet of another user', () => {
    this.user2 = createUser()
    this.user2_fleet = createFleet(this.user2)
})

Given("this vehicle has been registered into the other user's fleet", () => {
    registerVehiculeToFleet(this.user2_fleet, this.vehicule)
})

// park a vehicule
// Scenarion Succesfully park a vehicule

Given('a location', () => {
    this.location = { lat: '1', long: '1' }
})

When('I park my vehicle at this location', () => {
    parkVehicule(this.vehicule, this.location)
})

Then('the known location of my vehicle should verify this location', () => {
    assert.equal(this.vehicule.location, this.location)
})

// Scenarion Can't localize my vehicle to the same location two times in a row
Given('my vehicle has been parked into this location', () => {
    parkVehicule(this.vehicule, this.location)
})

When('I try to park my vehicle at this location', () => {
    this.result = parkVehicule(this.vehicule, this.location)
})

Then(
    'I should be informed that my vehicle is already parked at this location',
    () => {
        assert.equal(this.result, 'Vehicle is already parked at this location')
    }
)
