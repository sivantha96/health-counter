import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './../../models/bucket.dialog';

@Component({
  selector: 'app-bucket-dialog',
  templateUrl: './bucket-dialog.component.html',
  styleUrls: ['./bucket-dialog.component.css'],
})
export class BucketDialogComponent implements OnInit {
  bucketDisplayItems: any[];

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
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.dialogRef.close(this.data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(item) {
    this.data.deletedItems.push(this.data.currentBucket[item]);
    this.bucketDisplayItems.splice(item, 1);
    this.data.currentBucket.splice(item, 1);
    this.data.isNoChange = false;
  }
}
