import { IBucketDetails, IFamilyResponse } from '../models/data.model';
import { Injectable } from '@angular/core';

@Injectable()
export class BucketDataTransferService {
  bucket: IBucketDetails;
  response :IFamilyResponse;

public set_bucket_data(data: IBucketDetails) {
    this.bucket = data;
  }

  public get_bucket_data() {
    return this.bucket;
  }

  public set_family_response(response: IFamilyResponse){
   this.response = response;
  }

  public get_family_response(){
      return this.response;
  }
}
