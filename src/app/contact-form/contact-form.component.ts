import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NavigateService } from '@app/shared';
import { StateService } from '@app/shared';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private navigateService: NavigateService,
    private stateService: StateService,
    private fb: FormBuilder) {
      this.createForm();
    }

  createForm() {
    this.contactForm = this.fb.group({
      title: ['', Validators.required ],
      email: ['', Validators.required ],
      message: ['', Validators.required ]
    });
  }

  ngOnInit() {
  }

  closeForm() {
    this.stateService.toggleContactForm();
    this.stateService.toggleNavigation();
  }

}
