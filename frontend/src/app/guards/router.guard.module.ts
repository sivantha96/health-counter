import { DirectRouteGuard } from './direct.route.guard';
import { RouteGuardForBucket } from './bucket.route.guard';

import { NgModule } from '@angular/core';

@NgModule({
  providers: [RouteGuardForBucket, DirectRouteGuard],
})
export class RouterGuardModule {}
