
import { Component, OnInit } from '@angular/core';
import { transferArrayItem } from '@angular/cdk/drag-drop';
import { PostData } from '../../models/bucket';
import { ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import {MatProgressBarModule} from '@angular/material/progress-bar';

// import Copier from 'deep-copy-object'

// import { Interface } from 'readline';
import {ISymptoms } from './../../models/bucket';




@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css'],
})





export class BucketComponent implements OnInit {

  postData: PostData;
  members: any[]

  bucketIndex: number
  noOfBuckets: number

  symptomNo: number;

  // array for holding carousel items
  // symptomsTemplate: any[] = [
  //   ['No symptoms', 'Mild symptoms', 'Severe symptoms'],
  //   ['No symptoms', 'Mild symptoms', 'Severe symptoms'],
  //   ['No symptoms', 'Mild symptoms', 'Severe symptoms'],
  // ];

  severityArray=[
    "No Symptoms",
    "Mild symptoms",
    "Severe symptoms"
  ]
  

  symptomsTemplate: ISymptoms[] = 
    [
      {
        name:"Cough",
        severity:[...this.severityArray]
          
      },
      {
        name:"Cold",
        severity:[...this.severityArray]
          
      },
      {
        name:"itchy throat",
        severity:[...this.severityArray]
          
      },
      {
        name:"Throat Pain",
        severity:[...this.severityArray]
          
      },
      {
        name:"Taste loss",
        severity:[...this.severityArray]
          
      },

    ]
  





  bucket: string[];
  bucketStates: any[]

  symptomsArray: any;
  symptomsSates: any[]

  progressValue=0
  progressStepCost=0
  

  constructor(private route: ActivatedRoute) {
    this.symptomNo = 0;
    this.bucketIndex = 0;

    this.symptomsSates = []

    this.bucketStates = []
  }

  ngOnInit(): void {
    // parse stringified data received from the previous route
    this.route.queryParams.subscribe((params) => {
      try {
        this.postData = { ...JSON.parse(params.postData) };
      } catch (error) {
        console.log(error);
      }
    }); 

    this.noOfBuckets = +this.postData.family_members

    this.members = this.range(this.noOfBuckets)

    this.progressStepCost=100/this.noOfBuckets;
    this.progressValue=0;
    this.symptomsSates[0] = JSON.parse(JSON.stringify(this.symptomsTemplate))
    this.bucketStates[0] = []

    this.symptomsArray = this.symptomsSates[0]
    this.bucket = this.bucketStates[0];


  }

  //range for *ngFor
  range(n: number): any[] {
    return Array(n);
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      // console.log(event);
    } else {
      // console.log(event);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.symptomsSates[this.bucketIndex] = JSON.parse(JSON.stringify(this.symptomsArray))
      this.bucketStates[this.bucketIndex] = JSON.parse(JSON.stringify(this.bucket))

    }

    // this.bucket = [];
  }

  onClick(button) {
    if (button === 'Previous') {
      if (this.symptomNo === 0) {
        this.symptomNo = this.symptomsArray.length;
      }
      this.symptomNo = this.symptomNo - 1;
    } else {
      this.symptomNo = this.symptomNo + 1;
      if (this.symptomNo === this.symptomsArray.length) {
        this.symptomNo = 0;
      }
    }
  }

  //navigation
  goForward(stepper: MatStepper) {
    if (this.bucketIndex < this.noOfBuckets-1) {  
      if (this.symptomsSates[this.bucketIndex + 1] === undefined) {
        console.log('undefined')
        this.symptomsSates[this.bucketIndex + 1] = JSON.parse(JSON.stringify(this.symptomsTemplate))
        this.bucketStates[this.bucketIndex + 1] = []

        
       


      }

      this.symptomsArray = JSON.parse(JSON.stringify(this.symptomsSates[++this.bucketIndex])) 
      this.bucket = JSON.parse(JSON.stringify(this.bucketStates[this.bucketIndex])) 
      console.log('before state - ' + this.symptomsSates[this.bucketIndex])
      stepper.next();

      this.progressValue+=this.progressStepCost
      console.log(this.progressValue)
      // console.log('bucketNo ' + (this.bucketIndex+1))



      // console.log(this.symptomsSates[this.bucketIndex]) 
      

      
      // this.symptomsSates.forEach((state) => {
      //   console.log(state)
      // })
    }


  }

  goBack(stepper: MatStepper) {
    if (this.bucketIndex > 0) {
      this.symptomsArray = this.symptomsSates[--this.bucketIndex]
      this.bucket = this.bucketStates[this.bucketIndex]
      console.log('bucketNo ' + this.bucketIndex)
      stepper.previous();

      this.progressValue-=this.progressStepCost
      console.log(this.progressValue)
    }

  }

//   deepCopy(obj) {
//     const keys = Object.keys(obj)
//     let newObject=obj
//     for (let i = 0; i < keys.length; i++) {
//         const key = keys[i]
//         if (typeof obj[key] === 'object') {
//             newObject[key] = this.deepCopy(obj[key])
//         } else {
//             newObject[key] = obj[key]
//         }
//     }
//     return newObject
// }





}
