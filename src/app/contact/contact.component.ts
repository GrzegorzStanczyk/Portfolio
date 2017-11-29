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
import { ResizeService } from '@app/shared';
import { slideContactForm } from '@app/shared';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [slideContactForm]
})
export class ContactComponent implements OnInit, OnDestroy {
  public togglerInfoState: boolean = false;
  public isMobile: boolean = true;
  private formFocusState: boolean = false;
  private formSubscription: Subscription;
  private resizeSubscription: Subscription;
  private formFocusSubscription: Subscription;

  @ViewChild('infoToggler') infoToggler: ElementRef;

  constructor(
    private navigateService: NavigateService,
    private stateService: StateService,
    private resizeService: ResizeService,
    private elementRef: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.isMobile = this.resizeService.isMobile(window);
    this.formSubscription = this.stateService.contactFormState$
      .subscribe(() => this.closeForm());
    this.resizeSubscription = this.resizeService.resizeSubject$
      .debounceTime(100)
      .subscribe((event) => {
        this.isMobile = this.resizeService.isMobile(event);
        if (!this.isMobile && this.togglerInfoState) {
          this.togglerInfoState = false;
          this.stateService.toggleNavigation();
        }
      });
    this.formFocusSubscription = this.stateService.formFocusState$
      .subscribe((state: boolean) => this.formFocusState = state);
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
    this.resizeSubscription.unsubscribe();
    this.formFocusSubscription.unsubscribe();
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
    if (!this.formFocusState) this.navigateService.navigateToProjects();
  }

}
