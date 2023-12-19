import { Request, Response } from "./dto/signup.interface"

export class SignUpController {
    handle(request: Request): Response {
        const {name, email} = request
        if(!name || !email){
            return {
                statusCode: 400,
                body: new Error('Missing Params Error')
            }
        }
        
    }
}