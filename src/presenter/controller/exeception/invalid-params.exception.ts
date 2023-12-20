export class InvalidParamsException extends Error {
    constructor(){
        super('Invalid Params Error')
        this.name = 'InvalidParamsException'
    }
}