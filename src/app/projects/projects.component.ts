import { 
  Component, 
  OnInit,
  OnDestroy, 
  HostListener, 
  ElementRef,
  Renderer2,
  ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { ResizeService } from '@app/shared';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private resizeSubscription: Subscription;

  @ViewChild('projectInfo') projectInfo: ElementRef;
  @ViewChild('infoToggler') infoToggler: ElementRef;
  infoState: boolean = false;

  constructor(
    private router: Router, 
    private renderer: Renderer2,
    private resizeService: ResizeService) { }

  toggleInfo() {
    this.infoState = !this.infoState;
    if(this.infoState) {
      this.renderer.addClass(this.projectInfo.nativeElement, 'info-open');
      this.renderer.setAttribute(this.infoToggler.nativeElement, 'aria-expanded', 'true');
    } else {
      this.renderer.removeClass(this.projectInfo.nativeElement, 'info-open');
      this.renderer.setAttribute(this.infoToggler.nativeElement, 'aria-expanded', 'false');
    }
  }

  ngOnInit() {
    // Close the info modal if the window width is greather than 701px
    this.resizeSubscription = this.resizeService.resizeSubject$
    .debounceTime(200)
    .subscribe(event => {
      if(event.innerWidth > 701) {
        if(this.infoToggler.nativeElement.getAttribute('aria-expanded') === 'true') {
          this.renderer.setAttribute(this.infoToggler.nativeElement, 'aria-expanded', 'false');
          this.renderer.removeClass(this.projectInfo.nativeElement, 'info-open');
        }
      }
    });
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }
  
  @HostListener('document:keydown.ArrowLeft')
  navigeteToMain() {
    this.router.navigate(['/home']);
  }
  @HostListener('document:keydown.ArrowRight')
  navigeteToContact() {
    this.router.navigate(['/contact'])
  }
}
