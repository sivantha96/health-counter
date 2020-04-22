import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  Directive,
  ViewChild,
} from '@angular/core';
import { PostData } from 'src/app/models/bucket';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { BucketComponent } from '../bucket/bucket.component';
import { BucketDialogComponent } from '../bucket-dialog/bucket-dialog.component';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';

@Component({
  selector: 'app-bucket-stepper',
  templateUrl: './bucket-stepper.component.html',
  styleUrls: ['./bucket-stepper.component.css'],
})
export class BucketStepperComponent implements OnInit {
  // getting the child components with id = 'cmp' as an iterable list
  @ViewChildren('cmp') bucketQueryList: QueryList<BucketComponent>;

  //find the separate container for alert toaster
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;

  // Data of a single person - For POST Req
  postData: PostData;

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
    private toastr: ToastrService
  ) {
    this.carouselStates = [];
    this.bucketStates = [];
    this.carouselStates = [];
    this.indexBucket = 0;
  }

  ngOnInit(): void {
    // parsing stringified data received from the previous route to postData
    this.route.queryParams.subscribe((params) => {
      try {
        this.postData = { ...JSON.parse(params.postData) };
      } catch (error) {
        console.log(error);
      }
    });

    //initialize  alert toast container
    this.toastr.overlayContainer = this.toastContainer;

    // Setting number of buckets according to the received number of family members
    this.noOfBuckets = +this.postData.family_members;

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

        //POST REQ
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

      //POST REQ
      // ----------------------------------------------
      // ----------------------------------------------
      // ----------------------------------------------
    }
  }

  openDialog(): void {
    // create the dialog
    const dialogRef = this.dialog.open(BucketDialogComponent, {
      width: '250px',
      data: {
        currentBucket: this.bucketQueryList.toArray()[this.indexBucket]
          .currentBucket,
        indexBucket: this.bucketQueryList.toArray()[this.indexBucket]
          .indexBucket,
        carouselTemplate: this.bucketQueryList.toArray()[this.indexBucket]
          .carouselTemplate,
      },
    });

    // subscribe to dialogClosed event
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  //submitter at the last step
  onDone(): void {
    if (!this.isBucketFull()) {
      this.showBucketNoFilledAlert();
    } else {
      this.router.navigate(['./end'], {});
    }
  }

  // is the current Bucket completely filled
  isBucketFull(): boolean {
    let bucketArr = this.bucketQueryList;
    if (bucketArr === undefined) {
      return false;
    } else {
      return bucketArr.toArray()[this.indexBucket].currentBucket.length ===
        bucketArr.toArray()[this.indexBucket].carouselArray.length
        ? true
        : false;
    }
  }

  //show alert toaster - if bucket not completed
  showBucketNoFilledAlert() {
    this.toastr.warning(
      'Please complete the current bucket',
      'Incomplete Bucket',
      {
        timeOut: 2000,
        closeButton: true,
        positionClass: '.toast-bottom-full-width',
        tapToDismiss: true,
      }
    );
  }
}
