import personSchems from "../schemas/person.schema";
import { IPerson } from "../models/person.model";

export class PersonService {

    public createPerson(user: IPerson, callback: any) {
        const person_details = new personSchems(user);
        person_details.save(callback);
    }
}