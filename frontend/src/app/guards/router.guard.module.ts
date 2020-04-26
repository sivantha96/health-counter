import { RouteGuardForBucket } from './bucket.route.guard';

import { NgModule } from '@angular/core';

@NgModule({
  providers: [RouteGuardForBucket],
})
export class RouterGuardModule {}
