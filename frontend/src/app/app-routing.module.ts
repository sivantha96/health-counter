import { LandingComponent } from './component/landing/landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BucketComponent } from './component/bucket/bucket.component';



const routes: Routes = [
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'bucket',
    component: BucketComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
