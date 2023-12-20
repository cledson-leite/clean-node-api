import { IAddAccount } from '../../ports/in/i-add-account';
import { AccountDTO } from '../dto/account.dto';
import { Request } from '../dto/signup.interface';

export class AddAccountStub implements IAddAccount{
    add(params: Request): AccountDTO {
        return params
    }
}