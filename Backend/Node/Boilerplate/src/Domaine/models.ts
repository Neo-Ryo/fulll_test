import { prisma } from '../prisma'

export class User {
    id: number
    constructor(id: number) {
        this.id = id
    }
    async save() {
        let user = await prisma.user.findUnique({ where: { id: this.id } })
        if (!user) {
            user = await prisma.user.create({ data: { id: this.id } })
        }
        return user
    }
}

export type Location = { latitude: string; longitude: string }
export type VehiculeType = 'moto' | 'car' | 'truck'
export class Vehicule {
    async save(plate: string, type: VehiculeType, location?: Location) {
        let vehicule = await prisma.vehicule.findUnique({
            where: { plate: plate },
        })
        if (!vehicule) {
            vehicule = await prisma.vehicule.create({
                data: {
                    type: type,
                    plate: plate,
                    latitude: location?.latitude,
                    longitude: location?.longitude,
                },
            })
        }
        return vehicule
    }

    async get(plate: string) {
        return await prisma.vehicule.findUnique({ where: { plate } })
    }

    async parkVehicule(plate: string, location: Location) {
        let vehicule = await this.get(plate)
        if (!vehicule) {
            return 'Unregistered vehicule'
        }
        if (
            location.latitude === vehicule.latitude &&
            location.longitude === vehicule.longitude
        ) {
            return 'Vehicle is already parked at this location'
        }

        vehicule = await prisma.vehicule.update({
            where: { plate },
            data: {
                longitude: location.longitude,
                latitude: location.latitude,
            },
        })
        return vehicule
    }
}

export class Fleet {
    async save(userId: number) {
        let fleet = await prisma.fleet.findUnique({
            where: { owner_id: userId },
        })
        if (!fleet) {
            fleet = await prisma.fleet.create({
                data: { owner_id: userId },
            })
        }
        return fleet
    }

    async registerVehicule(fleetId: number, vehiculePlateNumber: string) {
        let fleet = await prisma.fleet.findUnique({
            where: { id: fleetId },
            include: { vehicules: true },
        })
        if (!fleet) {
            return 'Fleet not found'
        }
        if (fleet.vehicules.find((v) => v.plate === vehiculePlateNumber)) {
            return 'Vehicule already registered'
        }
        let vehicule_db = await prisma.vehicule.findUnique({
            where: { plate: vehiculePlateNumber },
        })
        if (!vehicule_db) {
            vehicule_db = await new Vehicule().save(vehiculePlateNumber, 'car')
        }
        fleet = await prisma.fleet.update({
            where: { id: fleetId },
            data: {
                vehicules: { set: vehicule_db },
            },
            include: { vehicules: true },
        })
        return fleet
    }
}
