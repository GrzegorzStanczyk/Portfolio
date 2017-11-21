import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  HostBinding,
  ViewChild,
  ElementRef,
  Renderer2 } from '@angular/core';

import { NavigateService } from '@app/shared';
import { StateService } from '@app/shared';
import { slideContactForm } from '@app/shared';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [slideContactForm]
})
export class ContactComponent implements OnInit, OnDestroy {
  public togglerInfoState: boolean = true;
  private formSubscription: Subscription;

  @ViewChild('infoToggler') infoToggler: ElementRef;

  constructor(
    private navigateService: NavigateService,
    private stateService: StateService,
    private elementRef: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.formSubscription = this.stateService.contactFormState$
      .subscribe(() => this.closeForm());
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
    if (this.togglerInfoState) this.stateService.toggleNavigation();
  }

  openForm() {
    this.togglerInfoState = true;
    this.stateService.toggleNavigation();
    this.renderer.setAttribute(this.infoToggler.nativeElement, 'aria-expanded', 'true');
  }

  closeForm() {
    this.togglerInfoState = false;
    this.renderer.setAttribute(this.infoToggler.nativeElement, 'aria-expanded', 'false');
  }


  @HostListener('document:keydown.ArrowLeft')
  @HostListener('swiperight')
  swipe() {
    this.navigateService.navigateToProjects();
  }

}
