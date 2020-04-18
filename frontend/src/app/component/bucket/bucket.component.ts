import { Component, OnInit } from '@angular/core';
import { transferArrayItem } from '@angular/cdk/drag-drop';
import { PostData } from '../../models/bucket';
import { ActivatedRoute } from '@angular/router';
import { MatStepper} from '@angular/material/stepper';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css'],
})
export class BucketComponent implements OnInit {

  bucketIndex:number
  noOfBuckets:number

  postData: PostData;
  symptomNo: number;
  
  
  members:any[]

  sysptomsTemplate:any[]= [
    ['symptoms 0', 'symptoms 0', 'symptoms 0'],
    ['symptoms 1', 'symptoms 1', 'symptoms 1'],
    ['symptoms 2', 'symptoms 2', 'symptoms 2'],
  ];


  bucket: string[];
  bucketStates:any[]

  sysptomsSates:any[]
  symptomsArray: any;

  constructor(private route: ActivatedRoute) {
    this.symptomNo = 0;
    this.bucketIndex=0;

    this.sysptomsSates=[]
    this.bucket = [];
    this.bucketStates=[]
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
   
    this.noOfBuckets=+this.postData.family_members
    
    this.members =this.range(this.noOfBuckets)

  
    this.sysptomsSates[0]=  JSON.parse(JSON.stringify(this.sysptomsTemplate))
    this.symptomsArray= JSON.parse(JSON.stringify(this.sysptomsTemplate))
   
   
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
      
      this.sysptomsSates[this.bucketIndex]= JSON.parse(JSON.stringify(this.symptomsArray))
      this.bucketStates[this.bucketIndex]=JSON.parse(JSON.stringify(this.bucket))
      
    }
 
    // this.bucket = [];
  }

  onClick(button) {
    if (button === 'Previous') {
      if (this.symptomNo === 0) {
        this.symptomNo = this.sysptomsSates[this.bucketIndex].length;
      }
      this.symptomNo = this.symptomNo - 1;
    } else {
      this.symptomNo = this.symptomNo + 1;
      if (this.symptomNo === this.sysptomsSates[this.bucketIndex].length) {
        this.symptomNo = 0;
      }
    }
  }

  //navigation
  goForward(stepper: MatStepper) {
    if(this.bucketIndex<this.noOfBuckets){
      if(this.sysptomsSates[this.bucketIndex+1]===undefined){
        console.log('undefined')
        this.sysptomsSates[this.bucketIndex+1]=JSON.parse(JSON.stringify(this.sysptomsTemplate))
        console.log('before state - '+this.sysptomsSates[this.bucketIndex+1] )
        this.bucketStates[this.bucketIndex+1]=[]
        
        
      }
      this.bucket=this.bucketStates[this.bucketIndex+1] 
      this.symptomsArray= this.sysptomsSates[++this.bucketIndex]
      console.log(this.sysptomsSates[this.bucketIndex]) 
      console.log('bucketNo '+ this.bucketIndex)


      stepper.next();
      this.sysptomsSates.forEach((state)=>{
        console.log(state)
      })
    }

   
  }

  goBack(stepper: MatStepper) {
    if(this.bucketIndex>0){
      this.symptomsArray= this.sysptomsSates[--this.bucketIndex]
      console.log('bucketNo '+this.bucketIndex)
      stepper.previous();
    }
   
  }





}
