import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StateService {
  private navigationStateSource = new Subject();
  private contactFormStateSource = new Subject();
  public navigationState$ = this.navigationStateSource.asObservable();
  public contactFormState$ = this.contactFormStateSource.asObservable();

  constructor() { }

  toggleNavigation() {
    this.navigationStateSource.next();
  }

  toggleContactForm() {
    this.contactFormStateSource.next();
  }
}
