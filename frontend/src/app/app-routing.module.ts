import { RouteGuardForBucket } from './guards/bucket.route.guard';
import { LandingComponent } from './component/landing/landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BucketStepperComponent } from './component/bucket-stepper/bucket-stepper.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { EndPageComponent } from './component/end-page/end-page.component';
import { NotFoundComponent } from './component/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'home',
    component: LandingComponent,
  },
  {
    path: 'home/:*',
    redirectTo: 'home',
  },
  {
    path: 'bucket',
    // ------------------------Deactivate Route Guard---------------------------- //
    // 1. comment out Route Guard section below
    // 2. comment out Route Guard section in the bucketStepper
    // 3. comment out Route Guard section in the landing page
    //---------------------- Route Guard-----------------------------------------------//
    canActivate: [RouteGuardForBucket],
    //---------------------- Route Guard-----------------------------------------------//
    
    component: BucketStepperComponent,
  },
  {
    path: 'end',
    component: EndPageComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
