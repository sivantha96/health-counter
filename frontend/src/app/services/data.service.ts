import { IPostData } from 'src/app/models/landing';
import { IFamilyDetails, IBucketDetails, IFamilyResponse } from '../models/data.model';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  baseUrl: string = 'http://localhost';
  port: string = ':3001';

  constructor(private http: HttpClient) {}

  public post_family_data(postData: IPostData): Observable<any> {
    let is_aboard,is_patient_contacted;
    
    if(postData.is_aboard == "Yes"){
       is_aboard = true ;
    }else if(postData.is_aboard == "No"){
      is_aboard = false ;
    }

    if(postData.is_patient_contacted == "Yes"){
      is_patient_contacted = true ;
   }else if(postData.is_patient_contacted == "No"){
     is_patient_contacted = false ;
   }

    let json = {
      is_aboard: is_aboard,
      is_patient_contacted: is_patient_contacted,
      n_family_members: postData.n_family_members,
    };
   
    return this.http
      .post<IFamilyDetails>(this.baseUrl + this.port + '/family/details/', json)
      .pipe(catchError(this.handleError));
  }

  public post_bucket_data(postData: IBucketDetails,family_id:IFamilyResponse,bucket_index:Number) {
    let json = {
      id: family_id.DATA.id,
      age: postData.age_group,
      gender: postData.gender,
      bucket_index:bucket_index,
      symptomsList: [
              {
                  symptom: "cough",
                  severity: postData.cough
              },
              {
                  symptom: "cold",
                  severity: postData.cold
              },
              {
                  symptom: "itchy throat",
                  severity: postData.itchy_throat
              },
              {
                  symptom: "throat pain",
                  severity: postData.throat_pain
              },
              {
                  symptom: "taste loss",
                  severity: postData.taste_loss
              }
              
             
          ]
    };

    return this.http
      .post<any>(
        this.baseUrl + this.port + "/person/details",json)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
    }
    return throwError(error.message || error);
  }
}
