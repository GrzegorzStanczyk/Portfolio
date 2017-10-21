import { 
  Component, 
  OnInit, 
  HostListener, 
  ElementRef,
  Renderer2,
  ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  private resizeEvent$: Subject<MouseEvent> = new Subject<MouseEvent>();
  @ViewChild('projectInfo') projectInfo: ElementRef;
  @ViewChild('infoToggler') infoToggler: ElementRef;
  infoState: boolean = false;

  constructor(private router: Router, private renderer: Renderer2) { }

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
    this.resizeEvent$
    .debounceTime(200)
    .subscribe(event => {
      if(window.innerWidth > 701) {
        if(this.infoToggler.nativeElement.getAttribute('aria-expanded') === 'true') {
          this.renderer.setAttribute(this.infoToggler.nativeElement, 'aria-expanded', 'false');
          this.renderer.removeClass(this.projectInfo.nativeElement, 'info-open');
        }
      }
    });
  }
  
  @HostListener('document:keydown.ArrowLeft')
  navigeteToMain() {
    this.router.navigate(['/home']);
  }
  @HostListener('document:keydown.ArrowRight')
  navigeteToContact() {
    this.router.navigate(['/contact'])
  }
  @HostListener('window:resize')
  resize(): void {
    this.resizeEvent$.next();
  }
}
