import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class RouteGuardForBucket implements CanActivate {
  id: String;
  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);

    if (!route.params.id) {
      this.router.navigate(['./landing']);
      return false;
    } else {
      return true;
    }
  }
}
