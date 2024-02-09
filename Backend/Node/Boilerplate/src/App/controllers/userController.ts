import { User } from '../../Domaine/models'

export async function createUser(id: number) {
    return await new User(id).save()
}
