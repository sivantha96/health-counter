import { IFamilyDetails } from './../../models/data.model';

import { Router, ActivatedRoute } from '@angular/router';
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
import { DataTransferService } from 'src/app/services/data.transfer.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit, OnDestroy {
  //catch the input field and next buttons for outside taping
  @ViewChild('inputField') inputField: ElementRef;
  @ViewChild('nextButton') nextButton: ElementRef;

  isOptional = false;

  //options recently aboard
  booleanGroups: IBoolean[] = [
    { value: 'Yes', viewValue: 'Yes' },
    { value: 'No', viewValue: 'No' },
  ];

  dataForm = new FormGroup({
    noOfFamily: new FormControl('', [Validators.required, this.numberOnly]),
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
    private dataTransferService: DataTransferService
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

  ngOnInit(): void {}

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
    // this.dataService.post_family_data(postQuery).subscribe((family_data) => {
    //   // let familyResponse=JSON.parse(family_data)
    //   this.transferData = {
    //     n_family_members: postQuery.n_family_members,
    //     id: family_data.DATA.id,
    //   };
    //   this.router.navigate(['./bucket']);
    // });
    // //---------------------------------------------------------------------------//

    // //------------------------Disable API POST-----------------------------------//
    //comment this out when you are ready to let the api connect with front end
    this.transferData = {
      n_family_members: postQuery.n_family_members,
      id: '1', //dummy id
    };
    //------------------------------------------------------------------------------//

    this.router.navigate(['./bucket', { id: this.transferData.id }]);
  }

  //custom validation
  numberOnly(event: AbstractControl): { [key: string]: boolean } | null {
    const inp = event.value ? event.value : event.value;
    if (isNaN(inp)) {
      return { notNumbers: true };
    } else {
      return null;
    }
  }
}
