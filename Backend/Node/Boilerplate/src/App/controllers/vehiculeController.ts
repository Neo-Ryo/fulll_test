import { Vehicule } from '../../Domaine/models'
import type { Location, VehiculeType } from '../../Domaine/models'

const vehicule = new Vehicule()

export async function createVehicule(plate: string, type: VehiculeType) {
    return await vehicule.save(plate, type)
}

export async function parkVehicule(plate: string, location: Location) {
    return await vehicule.parkVehicule(plate, location)
}
