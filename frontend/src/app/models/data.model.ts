export interface IFamilyDetails {
  id: String;
  n_family_members: Number;
}

export interface IFamilyResponse {
  STATUS: string,
  MESSAGE: String,
  DATA : {
    id:Number
  }
}

export interface IBucketDetails {
  id: Number;
  gender: String;
  age_group: String;
  cough: String;
  cold: String;
  itchy_throat: String;
  throat_pain: String;
  taste_loss: String;
}
