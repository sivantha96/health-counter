import { LandingComponent } from './component/landing/landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BucketComponent } from './component/bucket/bucket.component';
import { BucketStepperComponent } from './component/bucket-stepper/bucket-stepper.component';
import { WelcomeComponent } from './component/welcome/welcome.component';


const routes: Routes = [

  { path: '', component: WelcomeComponent },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'bucket',
    component: BucketStepperComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
