import { Component, OnInit } from '@angular/core';

import { NavigateService } from '@app/shared';
import { StateService } from '@app/shared';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  public title: string = '';
  public email: string = '';
  public message: string = '';

  constructor(
    private navigateService: NavigateService,
    private stateService: StateService) { }

  ngOnInit() {
  }

  closeForm() {
    this.stateService.toggleContactForm();
    this.stateService.toggleNavigation();
  }

}
