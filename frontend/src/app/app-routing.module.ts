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
    // ------------------------Activate Route Guard---------------------------- //
    // uncomment this out when you are ready to apply route guard for bucket.
    //Please make sure
    //1.uncomment out the activate Route Guard in bucketStepper.
    //2.uncomment out activate route guard in the landing page and

    canActivate: [RouteGuardForBucket],
    // ----------------------------------------------------------------------- //
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
