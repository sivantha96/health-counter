import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    n_family_members: Number,
    is_aboard: Boolean,
    is_patient_contacted: Boolean
});

export default mongoose.model('family_data', schema);