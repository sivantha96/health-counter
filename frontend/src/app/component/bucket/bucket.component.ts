import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Islide } from './../../models/bucket';
import { MatDialog } from '@angular/material/dialog';
import { BucketDialogComponent } from '../bucket-dialog/bucket-dialog.component';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css'],
})
export class BucketComponent implements OnInit {
  // index of the current bucket
  @Input() indexBucket: number;
  // number of total buckets
  @Input() noOfBuckets: number;

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
    this.currentBucket = [];
    this.bucketID = [];
    this.carouselID = [];
    this.slideCarouselID = [];
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
    this.carouselArray = JSON.parse(JSON.stringify(this.carouselTemplate));
  }

  ngOnInit(): void {}

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
      this.updateCurrentBucketFilledPercentage(this.currentBucket.length);
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

  openDialog(): void {
    const dialogRef = this.dialog.open(BucketDialogComponent, {
      width: '250px',
      data: { bucket: this.currentBucket },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  //update current  bucket filled percentage
  updateCurrentBucketFilledPercentage(val: number) {
    this.bucketProgressPercentage =
      (this.bucketProgressValue = val / this.carouselTemplate.length) * 100;
  }

  addIDCarousel() {
    let ID = 'carouselContainer' + this.indexBucket;
    this.carouselID.push(ID);
    return ID;
  }

  addIDBucket() {
    let ID = 'bucketContainer' + this.indexBucket;
    this.bucketID.push(ID);
    return ID;
  }

  addIDSlideCarousel() {
    let ID = 'slideCarousel' + this.indexBucket;
    this.slideCarouselID.push(ID);
    return ID;
  }
}
