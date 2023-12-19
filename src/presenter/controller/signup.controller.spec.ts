import {faker} from '@faker-js/faker'
import { SignUpController } from './signup.controller'
// const request = {
//             body: {
//                 name: faker.person.fullName(),
//                 email: faker.internet.email(),
//                 password: faker.internet.password()
//             }
describe('SingUp Controller', () => {
    it('Should return 400 if no name provided', () => {
        const sut = new SignUpController()
        const request = {
            body: {
                email: faker.internet.email(),
                password: faker.internet.password()
            }
        }
        const response = sut.handle(request)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(new Error('Missing Params Error'))
    })
})