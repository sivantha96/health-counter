import { IFamilyDetails, IFamilyResponse } from './../../models/data.model';

import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { IBoolean, IPostData } from 'src/app/models/landing';
import { DataService } from './../../services/data.service';
import { MatStepper } from '@angular/material/stepper';
import { ErrorStateMatcher } from '@angular/material/core';
import { DataTransferService } from 'src/app/services/data.transfer.service';
import { fader, slider } from 'src/app/route-animations';
import { BucketDataTransferService } from 'src/app/services/bucket.data.transfer.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

//check validity of inputs in the form
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  animations: [slider],
})
export class LandingComponent implements OnInit, OnDestroy {
  //catch the input field and next buttons for outside taping
  @ViewChild('inputField') inputField: ElementRef;
  @ViewChild('nextButton') nextButton: ElementRef;

  isOptional = false;

  //form validation
  matcher = new MyErrorStateMatcher();

  family_response: IFamilyResponse;

  //options recently aboard
  booleanGroups: IBoolean[] = [
    { value: 'Yes', viewValue: 'Yes' },
    { value: 'No', viewValue: 'No' },
  ];

  dataForm = new FormGroup({
    noOfFamily: new FormControl('', [
      this.numberOnly,
      this.familyLimit,
      Validators.required,
    ]),
    foreignContact: new FormControl('', Validators.required),
    closeContact: new FormControl('', Validators.required),
  });

  @Output() changed: EventEmitter<string> = new EventEmitter<string>();

  set foreign(val) {
    this.dataForm.get('foreignContact').setValue(val);
    this.changed.emit(this.dataForm.get('foreignContact').value);
  }

  @Input()
  get foreign() {
    return this.dataForm.get('foreignContact').value;
  }

  //transfer Data - stores the data, later  transferred to bucketStepper
  transferData: IFamilyDetails;

  constructor(
    private router: Router,
    activatedRoute: ActivatedRoute,
    private renderer: Renderer2,
    private dataService: DataService,
    private dataTransferService: DataTransferService,
    private bucketDataTransferService: BucketDataTransferService
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== this.inputField.nativeElement &&
        e.target !== this.nextButton.nativeElement
      ) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit(): void { }

  //transfer the data into bucketStepper after landing is destroyed
  ngOnDestroy(): void {
    this.dataTransferService.set_family_data(this.transferData);
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
    window.scrollTo(0, 0);
  }

  goForward(stepper: MatStepper) {
    stepper.next();
    window.scrollTo(0, 0);
  }

  onSelection(ans: IBoolean, stepper: MatStepper, element: any) {
    element.setValue(ans.value);
    stepper.next();
    window.scrollTo(0, 0);
  }

  onFormSubmit(): void {
    const submitData = Object.assign({}, this.dataForm.value);

    let postQuery: IPostData = {
      n_family_members: submitData.noOfFamily,
      is_aboard: submitData.foreignContact,
      is_patient_contacted: submitData.closeContact,
    };
    // //------------------------Enable API POST--------------------------------------------//
    // //uncomment this out when you are ready to let the api,  connect with front end
    this.dataService.post_family_data(postQuery).subscribe((family_data) => {
      let familyResponse = JSON.parse(family_data)
      this.family_response.STATUS = familyResponse.STATUS;
      this.family_response.MESSAGE = familyResponse.MESSAGE;
      this.family_response.DATA = familyResponse.DATA;
      this.bucketDataTransferService.set_family_response(this.family_response)
      this.transferData = {
        n_family_members: postQuery.n_family_members,
        id: family_data.DATA.id,
      };
      this.router.navigate(['./bucket']);
    });
    // //---------------------------------------------------------------------------//

    // //------------------------Disable API POST-----------------------------------//
    //comment this out when you are ready to let the api connect with front end
    this.transferData = {
      n_family_members: postQuery.n_family_members,
      id: '1', //dummy id
    };
    //------------------------------------------------------------------------------//

    //----------------------Activate Route Guard----------------------------------------//
    // uncomment this out when you are ready to apply route guard for bucket.
    //Please make sure
    //1.comment out the Deactivate Route Guard area below.
    //2.uncomment out activate route guard in the bucketStepper page and
    //3.uncomment out activate route guard area the in the bucket path of app.routing.module

    this.router.navigate(['./bucket', { id: this.transferData.id }]);
    //---------------------------------------------------------------------------------//

    // //----------------------Deactivate Route Guard----------------------------------------//
    // // uncomment this out when you want to deactivate route guard for bucket
    // //Please make sure
    // //1.comment out the Deactivate Route Guard area above.
    // //2.uncomment out deactivate route guard in the bucketStepper page and
    // //3.uncomment out deactivate route guard area the in the bucket path of app.routing.module
    // this.router.navigate(['./bucket']);
    // //-------------------------------------------------------------------------------------//
  }

  //custom validation
  //Validate input is a number?
  numberOnly(event: AbstractControl): { [key: string]: boolean } | null {
    const inp = event.value ? event.value : event.value;

    return isNaN(inp) ? { notNumbers: true } : null;
  }
  //Validate  noOfFamily limit(<)
  familyLimit(event: AbstractControl): { [key: string]: boolean } | null {
    //no of family limit
    const limit = 15;
    const inp = event.value ? event.value : event.value;

    return inp > limit ? { limitExceed: true } : null;
  }

  //custom error messages for validations
  errorMessages: { [key: string]: string } = {
    required: 'this field is required',
    notNumbers: 'only numeric values allowed',
    limitExceed: 'family limit is 15',
  };
}
