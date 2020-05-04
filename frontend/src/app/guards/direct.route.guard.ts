import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class DirectRouteGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // If the previous URL was blank, then the user is directly accessing this page
    console.log(next.routeConfig.path);
    if (this.router.url !== '/' || next.routeConfig.path === 'home') {
      return true;
    } else {
      this.router.navigate(['']); // Navigate away to some other page
      return false;
    }
  }
}
