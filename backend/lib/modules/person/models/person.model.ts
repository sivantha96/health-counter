import { gender, severity, age } from "modules/common/models/common.model";

export interface IPreson {
    family_id: String;
    age: age;
    gender: gender;
    symptomsList: {
        symptom: String;
        severity: severity;
    }[]
}