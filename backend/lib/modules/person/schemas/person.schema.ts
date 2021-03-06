import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    family_id: String,
    bucket_index: Number,
    age: String,
    gender: String,
    symptomsList: [{
        symptom: String,
        severity: String
    }]
});

export default mongoose.model('person', schema);