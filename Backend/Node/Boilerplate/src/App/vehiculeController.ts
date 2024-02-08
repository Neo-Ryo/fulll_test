import { Vehicule } from '../Domaine/models'
import type { Location, VehiculeType } from '../Domaine/models'

export function createVehicule(type: VehiculeType, plate: string) {
    return new Vehicule(type, plate, undefined)
}

export function parkVehicule(vehicule: Vehicule, location: Location) {
    return vehicule.parkVehicule(location)
}
