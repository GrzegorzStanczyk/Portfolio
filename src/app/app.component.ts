import { Component } from '@angular/core';

import { slideLeftAnimation } from '@app/shared';

@Component({
  selector: 'app-root',
  animations: [slideLeftAnimation],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
