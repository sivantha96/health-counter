export interface PostData {
  family_members: number;
  is_visited_foreign_country: string;
  is_had_close_contact: string;
}

// export interface ISeverity{
  
//   noSymptoms:string,
//   mildSymptoms:string,
//   severeSymptoms:string
  
// }

export interface ISymptoms{
  name:string,
  severity:string[]
}
