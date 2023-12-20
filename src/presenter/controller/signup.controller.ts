import { IEmailValidator } from "../ports/out/i-email-validator"
import { Request, Response } from "./dto/signup.interface"
import { InvalidParamsException, ServerError } from "./exeception"
import { MissingParamsException } from "./exeception/missing-params.exception"

export class SignUpController {
    constructor(private readonly validator: IEmailValidator){}
    handle(request: Request): Response {
        try {
            const {name, email, password} = request
        if(!name.trim() || !email.trim() || !password.trim()){
            return {
                statusCode: 400,
                body: new MissingParamsException()
            }
        }
        const isValid = this.validator.isValid(email)
        if(!isValid){
            return {
                statusCode: 400,
                body: new InvalidParamsException()
            }
        }
        } catch (error) {
            return {
                statusCode: 500,
                body: new ServerError()
            }
        }
    }
}