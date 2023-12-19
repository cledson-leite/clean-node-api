export class MissingParamsException extends Error {
    constructor(){
        super('Missing Params Error')
        this.name = 'MissingParamsException'
    }
}