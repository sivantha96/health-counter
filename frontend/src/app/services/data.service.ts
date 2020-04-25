import { IFamilyDetails } from '../models/data.model'
import { from } from 'rxjs'

export class DataService{

    private data: IFamilyDetails;

    public set_family_data (data: IFamilyDetails) {
        this.data = data;
    }
    
    public get_family_data () {
        return this.data;
    }
}