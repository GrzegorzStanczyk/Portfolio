import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StateService {
  private navigationStateSource = new Subject();
  public navigationState$ = this.navigationStateSource.asObservable();

  constructor() { }

  toggleNavigation() {
    this.navigationStateSource.next();
  }
}
