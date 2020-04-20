import { Component, OnInit, Inject } from '@angular/core';
import { transferArrayItem } from '@angular/cdk/drag-drop';
import { PostData } from '../../models/bucket';
import { ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { Islide, DialogData } from './../../models/bucket';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css'],
})
export class BucketComponent implements OnInit {
  // Data of a single person - For POST Req
  postData: PostData;

  // Array for number of family members
  members: any[];

  // Current bucket - starts from Zero 0
  indexBucket: number;

  // No of family members
  noOfBuckets: number;

  // Current symptom number
  indexCarousel: number;

  // array to hold severities
  severityArray = ['No Symptoms', 'Mild symptoms', 'Severe symptoms'];

  carouselTemplate: Islide[] = [
    {
      name: 'Gender',
      slideItems: ['Male', 'Female', 'Other'].map((x) => '0' + x),
    },
    {
      name: 'Age',
      slideItems: ['Infant', 'Child', 'Teenager', 'Adult', 'Elderly'].map(
        (x) => '1' + x
      ),
    },
    {
      name: 'Cough',
      slideItems: this.severityArray.map((x) => '2' + x),
    },
    {
      name: 'Cold',
      slideItems: this.severityArray.map((x) => '3' + x),
    },
    {
      name: 'itchy throat',
      slideItems: this.severityArray.map((x) => '4' + x),
    },
    {
      name: 'Throat Pain',
      slideItems: this.severityArray.map((x) => '5' + x),
    },
    {
      name: 'Taste loss',
      slideItems: this.severityArray.map((x) => '6' + x),
    },
  ];

  // Array for holding dropped symptoms for the current bucket
  currentBucket: string[];

  // Array for hold buckets
  bucketStates: any[];

  // Array for hold the severities of the current symptoms
  carouselArray: any;

  // Array for hold the state of carouselArray
  carouselStates: any[];

  // current value of the progress
  progressValue = 0;

  // value of a single step
  progressStepCost = 0;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.indexCarousel = 0;
    this.indexBucket = 0;
    this.carouselStates = [];
    this.bucketStates = [];
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

    // Setting number of buckets according to the received number of family members
    this.noOfBuckets = +this.postData.family_members;

    // constructing the dummy array for stepper
    this.members = this.range(this.noOfBuckets);

    // calculate the value for a single step
    this.progressStepCost = 100 / this.noOfBuckets;

    // setting the staring value of the progress
    this.progressValue = 0;

    // setting a new state in the carouselStates
    this.carouselStates[0] = JSON.parse(JSON.stringify(this.carouselTemplate));

    // setting a new state in the bucketStates
    this.bucketStates[0] = [];

    this.carouselArray = this.carouselStates[0];

    this.currentBucket = this.bucketStates[0];
  }

  // Range for *ngFor in Template
  range(n: number): any[] {
    return Array(n);
  }

  drop(event: any) {
    if (event.previousContainer !== event.container) {
      // get the current carousel index as string
      let myIndex: string = this.indexCarousel.toString();

      // get the value that dragged over
      let pattern = event.item.element.nativeElement.textContent.trim();

      // filter carousel template array in such a way that it returns a new array without the "pattern" (the value that dragged over)
      // and assign that value the current carouselArray
      // this replaces the default transferItem function provided by the cdk library
      // this will function as a swapper - not just moving an item from carousel to the bucket
      // this will swap the currently dragged item with the previously dragged item for the same carousel index
      this.carouselArray[this.indexCarousel].slideItems = this.carouselTemplate[
        this.indexCarousel
      ].slideItems.filter(function (str) {
        return str.indexOf(pattern) === -1;
      });

      // this will remove all the items that starts with the "myIndex"
      // this will remove all the previously dragged items from the same carousel index
      let newBucket = this.currentBucket.filter(function (str) {
        return str.indexOf(myIndex) === -1;
      });

      // this will transfer the currently dragged item from the carousel to the bucket
      this.currentBucket = [...newBucket, this.indexCarousel + pattern];

      // Save the template
      this.carouselStates[this.indexBucket] = JSON.parse(
        JSON.stringify(this.carouselArray)
      );
      this.bucketStates[this.indexBucket] = JSON.parse(
        JSON.stringify(this.currentBucket)
      );

      console.log('carouselArray:', this.carouselArray);
      console.log('carouselStates:', this.carouselStates);
      console.log('currentBucket:', this.currentBucket);
      console.log('bucketStates:', this.bucketStates);
    }
  }

  // Carousel arrow click Next & Back
  onClick(button) {
    if (button === 'Previous') {
      if (this.indexCarousel === 0) {
        this.indexCarousel = this.carouselArray.length;
      }
      this.indexCarousel = this.indexCarousel - 1;
    } else {
      this.indexCarousel = this.indexCarousel + 1;
      if (this.indexCarousel === this.carouselArray.length) {
        this.indexCarousel = 0;
      }
    }
  }

  // Next of Stepper - Next bucket
  goForward(stepper: MatStepper) {
    if (this.indexBucket < this.noOfBuckets - 1) {
      if (this.carouselStates[this.indexBucket + 1] === undefined) {
        console.log('undefined');
        this.carouselStates[this.indexBucket + 1] = JSON.parse(
          JSON.stringify(this.carouselTemplate)
        );
        this.bucketStates[this.indexBucket + 1] = [];
      }
      this.carouselArray = JSON.parse(
        JSON.stringify(this.carouselStates[++this.indexBucket])
      );
      this.currentBucket = JSON.parse(
        JSON.stringify(this.bucketStates[this.indexBucket])
      );
      console.log('before state - ' + this.carouselStates[this.indexBucket]);
      stepper.next();
      this.progressValue += this.progressStepCost;
      console.log(this.progressValue);
    }
  }

  // Back of Stepper - Previous bucket
  goBack(stepper: MatStepper) {
    if (this.indexBucket > 0) {
      this.carouselArray = this.carouselStates[--this.indexBucket];
      this.currentBucket = this.bucketStates[this.indexBucket];
      console.log('bucketNo ' + this.indexBucket);
      stepper.previous();
      this.progressValue -= this.progressStepCost;
      console.log(this.progressValue);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBucket, {
      width: '250px',
      data: { bucket: this.currentBucket },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'dialog-bucket',
  templateUrl: './dialog-bucket.html',
})
export class DialogBucket {
  constructor(
    public dialogRef: MatDialogRef<DialogBucket>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
