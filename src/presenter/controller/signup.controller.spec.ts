import {faker} from '@faker-js/faker'
import { SignUpController } from './signup.controller'
import { InvalidParamsException, MissingParamsException } from './exeception'
import { Request } from './dto/signup.interface'
import { IEmailValidator } from '../ports/out/i-email-validator'
import { EmailValidatorStub } from './mocks/email-validator.stub'
describe('SingUp Controller', () => {
    let validator: IEmailValidator
    let request: Request
    let sut: SignUpController

    beforeAll(() => {
        request = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        validator = new EmailValidatorStub()
        sut = new SignUpController(validator)
    })
    it('Should return 400 if no name provided', () => {
        const request = {
            name: ' ',
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
                email: ' ',
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
                password: ' '
        }
        const response = sut.handle(request)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(new MissingParamsException())
    })
    it('Should return 400 if an invalid email is provided', () => {
        jest.spyOn(validator, 'isValid').mockReturnValueOnce(false)
        const response = sut.handle(request)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(new InvalidParamsException())
    })
})