import personSchems from "../schemas/person.schema";
import { IPerson } from "../models/person.model";

export class PersonService {

    public createPerson(user: IPerson, callback: any) {
        const person_details = new personSchems(user);
        person_details.save(callback);
    }

    public filter(query: any, callback: any) {
        personSchems.findOne(query, callback);
    }

    public updatePerson(_id: string, person_params: IPreson, callback: any) {
        const query = { _id: _id };
        personSchems.findOneAndUpdate(query, person_params, callback);
    }
}