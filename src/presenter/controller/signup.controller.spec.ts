import {faker} from '@faker-js/faker'
import { SignUpController } from './signup.controller'
import { MissingParamsException } from './exeception/missing-params.exception'
// const request = {
//             body: {
//                 name: faker.person.fullName(),
//                 email: faker.internet.email(),
//                 password: faker.internet.password()
//             }
describe('SingUp Controller', () => {
    let sut: SignUpController

    beforeAll(() => {
        sut = new SignUpController()
    })
    it('Should return 400 if no name provided', () => {
        const request = {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        const response = sut.handle(request)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(new Error('Missing Params Error'))
    })
    it('Should return 400 if no email provided', () => {
    
        const request = {
                name: faker.person.fullName(),
                password: faker.internet.password()
        }
        const response = sut.handle(request)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(new MissingParamsException())
    })
    it('Should return 400 if no password provided', () => {
    
        const request = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
        }
        const response = sut.handle(request)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(new MissingParamsException())
    })
})