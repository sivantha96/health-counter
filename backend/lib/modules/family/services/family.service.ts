import userSchems from "../schemas/family.schems";
import { IFamily } from "../models/family.model";

export class UserService {

    public createFamily(user: IFamily, callback: any) {
        const user_details = new userSchems(user);
        user_details.save(callback);
    }
}