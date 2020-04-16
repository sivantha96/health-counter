import { Component, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EventEmitter } from 'events';
import { PostData } from '../../models/bucket';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent implements OnInit{
  postData: PostData;
  symptomNo = 0
  
  symptomsArray = [
    [
      'symptoms 0',
    'symptoms 0',
    'symptoms 0',
    ],
    [
      'symptoms 1',
    'symptoms 1',
    'symptoms 1'
    ],
    [
      'symptoms 2',
    'symptoms 2',
    'symptoms 2'
    ]
  ];

  bucket = [
  ]

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    // parse stringified data received from the previous route
    this.route.queryParams.subscribe((params) => {
      try {
        this.postData = { ...JSON.parse(params.postData)};
      } catch (error) {
        console.log(error);
      }
    });

  }

  drop(event: any){
    if (event.previousContainer === event.container) {
      console.log(event)
    } else {
      console.log(event)
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.bucket = []
  }

  onClick(button) {
    if (button === 'Previous') {
      if(this.symptomNo  === 0) {
        this.symptomNo = this.symptomsArray.length
      }
      this.symptomNo = this.symptomNo - 1
    } else {
      this.symptomNo = this.symptomNo + 1
      if(this.symptomNo === this.symptomsArray.length) {
        this.symptomNo = 0
      }
    }
    console.log("Now the value of symptom No is: " + this.symptomNo)
  }
}
