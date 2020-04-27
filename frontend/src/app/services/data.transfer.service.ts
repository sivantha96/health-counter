import { Injectable } from '@angular/core';
import { IFamilyDetails } from '../models/data.model';
import { from } from 'rxjs';

@Injectable()
export class DataTransferService {
  private data: IFamilyDetails;
  bucket: any;
  public set_family_data(data: IFamilyDetails) {
    this.data = data;
  }

  public get_family_data() {
    return this.data;
  }

  public set_bucket_data(data: any){
    this.bucket = data;
  }

  public get_bucket_data() {
    return this.bucket;
  }
}
