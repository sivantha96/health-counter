import { RouteGuardForBucket } from './guards/bucket.route.guard';
import { LandingComponent } from './component/landing/landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BucketComponent } from './component/bucket/bucket.component';
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
    // ---uncomment this when you are ready to use route guard for bucket ---- //
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
