import { AccountDTO } from "../../controller/dto/account.dto";
import { Request } from "../../controller/dto/signup.interface";

export interface IAddAccount {
    add(params: Request): AccountDTO
}