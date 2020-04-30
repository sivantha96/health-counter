import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

import { IFamilyDetails } from './../../models/data.model';
import { PostData } from 'src/app/models/bucket';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, DialogPosition } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { BucketComponent } from '../bucket/bucket.component';
import { BucketDialogComponent } from '../bucket-dialog/bucket-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { DataTransferService } from 'src/app/services/data.transfer.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bucket-stepper',
  templateUrl: './bucket-stepper.component.html',
  styleUrls: ['./bucket-stepper.component.css'],
})
export class BucketStepperComponent implements OnInit {
  // getting the child components with id = 'cmp' as an iterable list
  @ViewChildren('cmp') bucketQueryList: QueryList<BucketComponent>;

  // Data of a single person - For POST Req
  // api response - commented out for frontend********
  postData: IFamilyDetails;

  // id generated from landing
  landingId: string;

  // Array for number of family members
  members: any[];

  // current bucket
  indexBucket: number;

  // No of family members
  noOfBuckets: number;

  // current value of the progress
  progressValue = 0;

  // value of a single step
  progressStepCost = 0;

  // Array for hold buckets
  bucketStates: string[];

  // Array to hold carouselStates
  carouselStates: any[];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService,
    private dataTransferService: DataTransferService
  ) {
    this.carouselStates = [];
    this.bucketStates = [];
    this.carouselStates = [];
    this.indexBucket = 0;
  }

  ngOnInit(): void {
    // ------------------------Activate Route Guard---------------------------- //
    // uncomment this out when you are ready to apply route guard for bucket.
    // And also comment out the Deactivate Route Guard area below.
    // Keep in mind that you have to uncomment the canActivate of the bucket route
    // in the appRouting module

    // check route came from landing****************
    // catch the landing id generated from landing
    this.route.params.subscribe((params) => {
      this.landingId = params.id;
    });

    if (this.dataTransferService === undefined) {
      this.router.navigateByUrl('/landing');
    } else {
      // catch data from landing using data transfer service
      this.postData = this.dataTransferService.get_family_data();
      if (
        !this.landingId ||
        !this.postData ||
        this.landingId !== this.postData.id
      ) {
        // destroying the instance
        this.dataTransferService = null;
        this.router.navigateByUrl('/landing');
      }
    }
    // -------------------------------------------------------------------------- //

    // //------------------------Deactivate Route Guard----------------------------//
    // //uncomment this out when you are ready to apply route guard for bucket.
    // //And also comment out the Activate Route Guard area above.
    // //Keep in mind that you have to comment the canActivate of the bucket route
    // //in the appRouting module

    // //catch data from landing using data transfer service
    // this.postData = this.dataTransferService.get_family_data();
    // this.dataTransferService = null;
    // //--------------------------------------------------------------------------//

    // Setting number of buckets according to the received number of family members
    // this.noOfBuckets = +this.postData.family_members;

    // api response - commented out for frontend********
    this.noOfBuckets = +this.postData.n_family_members;

    // constructing the dummy array for stepper
    this.members = this.giveMeDummy(this.noOfBuckets);

    // calculate the value for a single step
    this.progressStepCost = 100 / this.noOfBuckets;

    // setting the staring value of the progress
    this.progressValue = 0;
  }

  // dummy array creator
  giveMeDummy(n: number): any[] {
    return Array(n);
  }

  // method to save bucket states by deep copying the array
  saveState(bucketList) {
    this.bucketStates[this.indexBucket] = JSON.parse(
      JSON.stringify(bucketList[this.indexBucket].currentBucket)
    );
  }

  // Next of Stepper - Next bucket
  goForward(stepper: MatStepper) {
    if (!this.isBucketFull()) {
      this.showBucketNoFilledAlert();
    } else {
      if (this.indexBucket < this.noOfBuckets - 1) {
        // pass the iterable list as an array to the saveState method
        this.saveState(this.bucketQueryList.toArray());

        // next
        this.indexBucket = this.indexBucket + 1;
        stepper.next();
        this.progressValue += this.progressStepCost;

        // POST REQ
        // ----------------------------------------------
        // ----------------------------------------------
        // ----------------------------------------------
      }
    }
  }

  // Back of Stepper - Previous bucket
  goBack(stepper: MatStepper) {
    if (this.indexBucket > 0) {
      // pass the iterable list as an array to the saveState method
      this.saveState(this.bucketQueryList.toArray());

      // previous
      this.indexBucket = this.indexBucket - 1;
      stepper.previous();
      this.progressValue -= this.progressStepCost;

      // POST REQ
      // ----------------------------------------------
      // ----------------------------------------------
      // ----------------------------------------------
    }
  }

  openDialog(): void {
    this.bucketQueryList.toArray()[this.indexBucket].openDialog();
  }

  // submitter at the last step
  onDone(): void {
    if (!this.isBucketFull()) {
      this.showBucketNoFilledAlert();
    } else {
      this.router.navigate(['./end'], {});
    }
  }

  // is the current Bucket completely filled
  isBucketFull(): boolean {
    const bucketArr = this.bucketQueryList;
    if (bucketArr === undefined) {
      return false;
    } else {
      return bucketArr.toArray()[this.indexBucket].currentBucket.length ===
        bucketArr.toArray()[this.indexBucket].carouselArray.length;
    }
  }

  // show alert toaster - if bucket not completed
  showBucketNoFilledAlert() {
    this.toastr.info('Please complete the current bucket', 'Incomplete', {
      // toastClass:"ngx-toast",
      timeOut: 2000,
      // closeButton: true,
      positionClass: 'toast-center-center',
      tapToDismiss: true,
    });
  }
}
