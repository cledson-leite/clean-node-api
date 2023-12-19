import { Request, Response } from "./dto/signup.interface"
import { MissingParamsException } from "./exeception/missing-params.exception"

export class SignUpController {
    handle(request: Request): Response {
        const {name, email} = request
        if(!name || !email){
            return {
                statusCode: 400,
                body: new MissingParamsException
            }
        }
        
    }
}