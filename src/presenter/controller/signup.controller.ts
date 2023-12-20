import { Request, Response } from "./dto/signup.interface"
import { MissingParamsException } from "./exeception/missing-params.exception"

export class SignUpController {
    handle(request: Request): Response {
        const {name, email, password} = request
        if(!name.trim() || !email.trim() || !password.trim()){
            return {
                statusCode: 400,
                body: new MissingParamsException()
            }
        }
        
    }
}