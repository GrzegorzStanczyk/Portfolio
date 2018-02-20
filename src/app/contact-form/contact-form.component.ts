import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NavigateService, StateService, SendMessageService } from '@app/shared';
import { FormControl } from '@angular/forms/src/model';

import { Subscription } from 'rxjs/Subscription';

import { Message } from '@app/shared';
import { fadeAnimation } from '@app/shared';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as MessageActions from '../actions/message';

@Component({
  selector: 'app-contact-form',
  animations: [fadeAnimation],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit, OnDestroy {
  public contactForm: FormGroup;
  public showLoader: boolean = false;
  public showSuccess: boolean = false;
  public showError: boolean = false;

  constructor(
    private navigateService: NavigateService,
    private stateService: StateService,
    private sendMessageService: SendMessageService,
    private fb: FormBuilder,
    private store: Store<fromRoot.AppState>) {
      this.createForm();
    }

  focusFunction() {
    this.stateService.toggleFocusState(true);
  }

  focusOutFunction() {
    this.stateService.toggleFocusState(false);
  }

  createForm() {
    this.store.select(fromRoot.getMessage)
      .subscribe(message => {
        this.contactForm = this.fb.group({
          title: [message.title, Validators.required ],
          email: [message.email, Validators.required ],
          message: [message.message, Validators.required ],
          honey: [message.honey, Validators.maxLength(0) ]
        });
      });
  }

  sendMessage() {
    this.showLoader = true;
    this.sendMessageService.sendEmail(this.contactForm.value)
      .subscribe(res => {
        this.showLoader = false;
        this.showSuccess = true;
        setTimeout(() => { this.showSuccess = false; }, 5000);
        this.contactForm.reset();
      }, error => {
        this.showLoader = false;
        this.showError = true;
      });
  }

  closeForm() {
    this.stateService.toggleContactForm();
    this.stateService.toggleNavigation();
  }

  closeMessage() {
    if (this.showSuccess) this.showSuccess = false;
    if (this.showError) this.showError = false;
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.contactForm) {
      this.store.dispatch(new MessageActions.SaveMessageAction(this.contactForm.value));
    }
  }
}
