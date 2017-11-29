import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NavigateService, StateService, SendMessageService } from '@app/shared';
import { FormControl } from '@angular/forms/src/model';

import { Subscription } from 'rxjs/Subscription';

import { Message } from '@app/shared';
import { fadeAnimation } from '@app/shared';


@Component({
  selector: 'app-contact-form',
  animations: [fadeAnimation],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  public contactForm: FormGroup;
  public showLoader: boolean = false;
  public showSuccess: boolean = false;
  public showError: boolean = true;

  constructor(
    private navigateService: NavigateService,
    private stateService: StateService,
    private sendMessageService: SendMessageService,
    private fb: FormBuilder) {
      this.createForm();
    }

  focusFunction() {
    this.stateService.toggleFocusState(true);
  }

  focusOutFunction() {
    this.stateService.toggleFocusState(false);
  }

  show() {
    this.showLoader = !this.showLoader;
  }

  createForm() {
    this.contactForm = this.fb.group({
      title: ['', Validators.required ],
      email: ['', Validators.required ],
      message: ['', Validators.required ],
      honey: ['', Validators.maxLength(0) ]
    });
  }

  sendMessage() {
    this.showLoader = true;
    this.sendMessageService.sendEmail(this.contactForm.value)
      .subscribe(res => {
        console.log('app response succes', res);
        this.showLoader = false;
        this.showSuccess = true;
        setTimeout(() => { this.showSuccess = false; }, 3000);
        this.contactForm.reset();
      }, error => {
        console.log('app response error', error);
        this.showLoader = false;
        this.showError = true;
      });
  }

  closeForm() {
    this.stateService.toggleContactForm();
    this.stateService.toggleNavigation();
  }

  ngOnInit() {
  }
}
