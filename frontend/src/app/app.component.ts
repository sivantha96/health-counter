import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider, fader } from './route-animations'
import { trigger, transition, style, query, group, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slider
  ]
})
export class AppComponent {
  title = 'health-counter';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData ;
  }
}

