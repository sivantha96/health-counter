import { gender, severity, age } from "modules/common/models/common.model";

export interface IPerson {
    family_id: string;
    bucket_index: number;
    age: age;
    gender: gender;
    symptomsList: {
        symptom: string;
        severity: severity;
    }[]
}

export interface IGetPreson {
    _id: string;
    family_id: String;
    bucket_index: number;
    age: age;
    gender: gender;
    symptomsList: {
        symptom: string;
        severity: severity;
    }[]
}