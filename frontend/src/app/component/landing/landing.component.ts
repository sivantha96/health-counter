import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, EventEmitter, Input, Output,} from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { IBoolean, IPostData } from 'src/app/models/landing';
import { MatStepper } from '@angular/material/stepper';
import { MatChipsModule, MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {



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

  constructor(private router: Router, activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }

  onSelection(ans: IBoolean, stepper: MatStepper, element: any) {
    element.setValue(ans.value);
    stepper.next();
  }

  onFormSubmit(): void {
    const submitData = Object.assign({}, this.dataForm.value);

    let postQuery: IPostData = {
      family_members: submitData.noOfFamily,
      is_visited_foreign_country: submitData.foreignContact,
      is_had_close_contact: submitData.closeContact,
    };

    this.router.navigate(['./bucket'], {
      queryParams: {
        postData: JSON.stringify(postQuery),
      },
    });
  }

  //custom validation
  numberOnly(event: AbstractControl): { [key: string]: boolean } | null {
    const inp = event.value ? event.value : event.value;
    if (isNaN(inp)) {
      console.log('error cha present');
      return { notNumbers: true };
    } else {
      return null;
    }
  }




}
