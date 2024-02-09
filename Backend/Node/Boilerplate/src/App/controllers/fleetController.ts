import { Fleet, User, Vehicule } from '../../Domaine/models'

export async function createFleet(userId: number) {
    return await new Fleet().save(userId)
}

export async function registerVehiculeToFleet(
    fleetId: number,
    vehiculePlateNumber: string
) {
    return await new Fleet().registerVehicule(fleetId, vehiculePlateNumber)
}
