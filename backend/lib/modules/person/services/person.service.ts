import personSchems from "../schemas/person.schema";
import { IPreson } from "../models/person.model";

export class PersonService {

    public createPerson(user: IPreson, callback: any) {
        const person_details = new personSchems(user);
        person_details.save(callback);
    }
}