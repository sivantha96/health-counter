import { Component, OnInit } from '@angular/core';
import { transferArrayItem } from '@angular/cdk/drag-drop';
import { PostData } from '../../models/bucket';
import { ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';

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

  // Template f severities to copy into symptoms array when creating a new step(bucket)
  carouselTemplate: any[] = [
    ['Female', 'Male', 'Other'],
    ['Infant', 'Child', 'Teenager', 'Adult', 'Elderly'],
    ['No symptoms', 'Mild symptoms', 'Severe symptoms'],
    ['No symptoms', 'Mild symptoms', 'Severe symptoms'],
    ['No symptoms', 'Mild symptoms', 'Severe symptoms'],
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

  constructor(private route: ActivatedRoute) {
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
    this.progressValue = this.progressStepCost;

    // deep copy
    this.carouselStates[0] = JSON.parse(JSON.stringify(this.carouselTemplate));

    // initialize
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
      console.log(event);
      console.log(this.indexCarousel)
      console.log(event.item.element.nativeElement.textContent);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Save the template
      this.carouselStates[this.indexBucket] = JSON.parse(
        JSON.stringify(this.carouselArray)
      );
      this.bucketStates[this.indexBucket] = JSON.parse(
        JSON.stringify(this.currentBucket)
      );
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
}
