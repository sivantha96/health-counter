import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './../../models/bucket.dialog';
import { Islide } from 'src/app/models/bucket';

@Component({
  selector: 'app-bucket-dialog',
  templateUrl: './bucket-dialog.component.html',
  styleUrls: ['./bucket-dialog.component.css'],
})
export class BucketDialogComponent implements OnInit {
  bucketDisplayItems: any[];
  originalBucketDisplayItems: any[]
  currentBucket: string[]
  carouselTemplate: Islide[]
  isNoChange: boolean;
  deletedItems: any[]

  constructor(
    public dialogRef: MatDialogRef<BucketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    dialogRef.disableClose = true;
    this.bucketDisplayItems = [];
    this.data.currentBucket.forEach((bucketItem) => {
      let tempArray = this.data.carouselTemplate.filter((element) =>
        element.slideItems.includes(bucketItem)
      );
      let newObject = {
        name: tempArray[0].name,
        value: bucketItem.slice(1),
      };
      this.bucketDisplayItems.push(newObject);
    });
    this.originalBucketDisplayItems = JSON.parse(JSON.stringify(this.bucketDisplayItems))
    this.currentBucket = [...data.currentBucket]
    this.isNoChange = true
    this.deletedItems = []
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const sendData = {
      isNoChange: this.isNoChange,
      currentBucket: this.currentBucket,
      deletedItems: this.deletedItems,
    }
    this.dialogRef.close(sendData);
  }

  onCancel(): void {
    if (!this.isNoChange) {
      this.bucketDisplayItems = JSON.parse(JSON.stringify(this.originalBucketDisplayItems))
      this.currentBucket = this.data.currentBucket
    }
    this.dialogRef.close();
  }

  onDelete(item) {
    this.deletedItems.push(this.currentBucket[item]);
    this.bucketDisplayItems.splice(item, 1);
    this.currentBucket.splice(item, 1);
    this.isNoChange = false;
  }
}
