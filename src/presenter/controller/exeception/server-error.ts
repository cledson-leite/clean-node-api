export class ServerError extends Error {
    constructor(){
        super('Unexpected Error')
        this.name = 'ServerError'
    }
}