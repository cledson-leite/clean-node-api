export class SignUpController {
    handle(request) {
        const {name, email} = request.body
        if(!name || !email){
            return {
                statusCode: 400,
                body: new Error('Missing Params Error')
            }
        }
        
    }
}