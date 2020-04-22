import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Islide } from './../../models/bucket';
import { MatDialog } from '@angular/material/dialog';
import { BucketDialogComponent } from '../bucket-dialog/bucket-dialog.component';

declare var $: any;

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css'],
})
export class BucketComponent implements OnInit {
  // getting the index of the current bucket from the parent
  @Input() indexBucket: number;

  // getting the number of total buckets from the parent
  @Input() noOfBuckets: number;

  // getting the state of the bucket array from the parent
  @Input() bucketStates: string[];

  // getting the state of the carousel array from the parent
  @Input() carouselStates: any[];

  //Bucket IDs
  bucketID: string[];

  //Carousel IDs
  carouselID: string[];

  //SlideCarousel IDs
  slideCarouselID: string[];

  // Current symptom number
  indexCarousel: number;

  // CURRENT BUCKET
  currentBucket: any;

  // Array for hold the severities of the current symptoms
  carouselArray: any;

  // array to hold severities
  severityArray = ['No Symptoms', 'Mild symptoms', 'Severe symptoms'];

  // template fpr carousel
  carouselTemplate: Islide[];

  //current value of of the bucket  progress percentage
  bucketProgressValue = 0;
  //current value of of the bucket  progress percentage
  bucketProgressPercentage = 0;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.indexCarousel = 0;
    this.bucketID = [];
    this.carouselID = [];
    this.slideCarouselID = [];

    // initializing the carousel template
    // here, map() function is used to concatenate a number in-front of each slide item
    // that number is used for the logic inside drop() function
    this.carouselTemplate = [
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

    if (typeof this.bucketStates === 'undefined') {
      //check the state received by the parent is undefined
      // if so deep copy the template array into the carouselArray and initialize an empty bucket
      this.carouselArray = JSON.parse(JSON.stringify(this.carouselTemplate));
      this.currentBucket = [];
    } else if (typeof this.bucketStates[this.indexBucket] === 'undefined') {
      // check the bucket relevant to the current indexBucket is undefined
      // if so deep copy the template array into the carouselArray and initialize an empty bucket
      this.carouselArray = JSON.parse(JSON.stringify(this.carouselTemplate));
      this.currentBucket = [];
    } else {
      // restore the previous state
      // deep clone the bucket array got from the parent in to the current bucket
      this.currentBucket = JSON.parse(
        JSON.stringify(this.bucketStates[this.indexBucket])
      );
      // deep clone the carousel array got from the parent in to the current carousel array
      this.carouselArray = JSON.parse(
        JSON.stringify(this.carouselStates[this.indexBucket])
      );
    }
  }

  ngOnInit(): void {}

  drop(event: any) {
    if (event.previousContainer !== event.container) {
      // get the current carousel index as a string
      let myIndex: string = this.indexCarousel.toString();

      // get the value of the item that dragged over and trim its blank spaces
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
      // (items that starts with the "myIndex") = (previously dragged items from the same carousel index)
      let newBucket = this.currentBucket.filter(function (str) {
        return str.indexOf(myIndex) === -1;
      });

      // this will transfer the currently dragged item from the carousel to the bucket
      this.currentBucket = [...newBucket, this.indexCarousel + pattern];

      //updates the current bucket filled progress value
      this.updateCurrentBucketFilledPercentage(this.currentBucket.length);

      // new array that hold boolean values which checks whether a single slide is incomplete or not
      let tempArray = this.carouselArray.map(
        (slide, index) =>
          slide.slideItems.length ===
          this.carouselTemplate[index].slideItems.length
      );

      // the index that contains a true for an incomplete slide
      let incompleteSlide = tempArray.indexOf(true);
      // if there are incomplete slides, then transfer into that specific slide automatically
      if (incompleteSlide >= 0) {
        // find the carousel by ID using jquery an use default carousel methods to navigate
        $('#' + this.addIDSlideCarousel()).carousel(incompleteSlide);
        // set the index of the incomplete slide as the current carousel index
        this.indexCarousel = incompleteSlide;
      }
    }
  }

  // Carousel arrow click Next & Back
  onClick(button) {
    if (button === 'Previous') {
      // wrapping around
      if (this.indexCarousel === 0) {
        this.indexCarousel = this.carouselArray.length;
      }

      // decrementing index
      this.indexCarousel = this.indexCarousel - 1;
    } else {
      //incrementing index
      this.indexCarousel = this.indexCarousel + 1;

      // wrapping around
      if (this.indexCarousel === this.carouselArray.length) {
        this.indexCarousel = 0;
      }
    }
  }

  openDialog(): void {
    // create the dialog
    const dialogRef = this.dialog.open(BucketDialogComponent, {
      width: '250px',
      data: { bucket: this.currentBucket },
    });

    // subscribe to dialogClosed event
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  //update current bucket filled percentage
  updateCurrentBucketFilledPercentage(val: number) {
    this.bucketProgressPercentage =
      (this.bucketProgressValue = val / this.carouselTemplate.length) * 100;
  }

  // add a carousel container ID - used for drag & drop
  addIDCarousel() {
    let ID = 'carouselContainer' + this.indexBucket;
    this.carouselID.push(ID);
    return ID;
  }

  // add a bucket ID - used for drag & drop
  addIDBucket() {
    let ID = 'bucketContainer' + this.indexBucket;
    this.bucketID.push(ID);
    return ID;
  }

  // add a carousel slide ID - used for carousel arrows
  addIDSlideCarousel() {
    let ID = 'slideCarousel' + this.indexBucket;
    this.slideCarouselID.push(ID);
    return ID;
  }
}
