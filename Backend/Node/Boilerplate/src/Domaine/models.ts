import { randomUUID } from 'crypto'

export class User {
    user_uuid: string
    constructor() {
        this.user_uuid = randomUUID()
    }
}
export class Fleet {
    uuid: string
    user: User
    vehicules: Vehicule[]
    constructor(user: User) {
        this.uuid = randomUUID()
        this.user = user
        this.vehicules = []
    }

    registerVehicule(vehicule: Vehicule) {
        if (this.vehicules.find((v) => v.plate === vehicule.plate)) {
            return 'Vehicule already registered'
        }
        this.vehicules.push(vehicule)
        return this.vehicules
    }
}

export type Location = { lat: string; lon: string }
export type VehiculeType = 'moto' | 'car' | 'truck'
export class Vehicule {
    type: VehiculeType
    plate: string
    location?: Location
    constructor(
        type: VehiculeType,
        plate: string,
        location: Location | undefined
    ) {
        this.type = type
        this.plate = plate
        this.location = location
    }

    parkVehicule(location: Location) {
        if (
            this.location?.lat === location.lat &&
            this.location.lon === location.lon
        ) {
            return 'Vehicle is already parked at this location'
        }
        this.location = location
        return this.location
    }
}
