import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './../../models/bucket.dialog';

@Component({
  selector: 'app-bucket-dialog',
  templateUrl: './bucket-dialog.component.html',
  styleUrls: ['./bucket-dialog.component.css'],
})
export class BucketDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BucketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
