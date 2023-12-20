import { IEmailValidator } from "../../ports/out/i-email-validator";

export class EmailValidatorStub implements IEmailValidator{
    isValid(): boolean {
        return true
    }
}