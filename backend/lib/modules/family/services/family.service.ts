import familySchems from "../schemas/family.schems";
import { IFamily } from "../models/family.model";

export class FamilyService {

    public createFamily(user: IFamily, callback: any) {
        const user_details = new familySchems(user);
        user_details.save(callback);
    }
}