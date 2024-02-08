import { Fleet, User, Vehicule } from '../Domaine/models'

export function createFleet(user: User) {
    return new Fleet(user)
}

export function registerVehiculeToFleet(fleet: Fleet, vehicule: Vehicule) {
    return fleet.registerVehicule(vehicule)
}
