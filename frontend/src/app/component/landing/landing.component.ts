import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { IBoolean, IPostData } from 'src/app/models/landing';

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

  constructor(private router: Router, activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  onFormSubmit(): void {
    const submitData = Object.assign({}, this.dataForm.value);

    let postQuery: IPostData = {
      family_members: submitData.noOfFamily,
      is_visited_foreign_country: submitData.foreignContact,
      is_had_close_contact: submitData.closeContact,
    };

    this.router.navigate(['./'], {
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
