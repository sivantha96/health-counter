import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketStepperComponent } from './bucket-stepper.component';

describe('BucketStepperComponent', () => {
  let component: BucketStepperComponent;
  let fixture: ComponentFixture<BucketStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
