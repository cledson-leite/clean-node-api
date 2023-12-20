import {faker} from '@faker-js/faker'
import { SignUpController } from './signup.controller'
import { InvalidParamsException, MissingParamsException, ServerError } from './exeception'
import { Request } from './dto/signup.interface'
import { IEmailValidator } from '../ports/out/i-email-validator'
import { EmailValidatorStub } from './mocks/email-validator.stub'
import { AddAccountStub } from './mocks/add-account.stub'
import { IAddAccount } from '../ports/in/i-add-account'
describe('SingUp Controller', () => {
    let validator: IEmailValidator
    let addAccount: IAddAccount
    let request: Request
    let sut: SignUpController

    beforeAll(() => {
        request = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        validator = new EmailValidatorStub()
        addAccount = new AddAccountStub()
        sut = new SignUpController(addAccount, validator)
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
    it('Should call emailValidator with correct email', () => {
        const isValidSpy = jest.spyOn(validator, 'isValid')
        sut.handle(request)
        expect(isValidSpy).toHaveBeenCalledWith(request.email)
    })
    it('Should return 400 if an invalid email is provided', () => {
        jest.spyOn(validator, 'isValid').mockReturnValueOnce(false)
        const response = sut.handle(request)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(new InvalidParamsException())
    })
    it('Should return 500 if validator throws', () => {
        jest.spyOn(validator, 'isValid').mockImplementationOnce(() => { throw new Error()})
        const response = sut.handle(request)
        expect(response.statusCode).toBe(500)
        expect(response.body).toEqual(new ServerError())
    })
    it('Should call addAccount with correct params', () => {
        const addSpy = jest.spyOn(addAccount, 'add')
        sut.handle(request)
        expect(addSpy).toHaveBeenCalledWith(request)
    })
    it('Should return 200 if success', () => {
        const response = sut.handle(request)
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(request)
    })
})