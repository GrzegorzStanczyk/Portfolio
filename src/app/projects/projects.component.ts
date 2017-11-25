import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  HostListener,
  EventEmitter,
  ElementRef,
  Renderer2,
  ViewChild } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { ResizeService } from '@app/shared';
import { StorageService } from '@app/shared';
import { StateService } from '@app/shared';
import { PROJECTS } from '@app/shared';
import { Project } from '@app/shared';
import { slideDownAnimation } from '@app/shared';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/throttleTime';


@Component({
  selector: 'app-projects',
  animations: [slideDownAnimation],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, AfterViewInit, OnDestroy {
  private resizeSubscription: Subscription;
  private togglerInfoState: boolean = false;
  private mouseWheelSubscription = new Subject<MouseWheelEvent>();
  public projectCounter: number = null || 1;
  public project: Project;
  public projects: Project[] = PROJECTS;
  public showRipple = true;

  @ViewChild('projectInfo') projectInfo: ElementRef;
  @ViewChild('infoToggler') infoToggler: ElementRef;
  @ViewChild('rippleProject') rippleProject: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private resizeService: ResizeService,
    private storageService: StorageService,
    private stateService: StateService,
    private el: ElementRef) { }

  toggleInfo() {
    this.togglerInfoState = !this.togglerInfoState;
    if (this.togglerInfoState) {
      this.renderer.addClass(this.projectInfo.nativeElement, 'info-open');
      this.renderer.setAttribute(this.infoToggler.nativeElement, 'aria-expanded', 'true');
    } else {
      this.renderer.removeClass(this.projectInfo.nativeElement, 'info-open');
      this.renderer.setAttribute(this.infoToggler.nativeElement, 'aria-expanded', 'false');
    }
    this.stateService.toggleNavigation();
  }

  // Match the path, to render correct project
  matchPath() {
    this.route.params.subscribe((params: Params) => {
      this.project = PROJECTS.find((project, index) => {
        if (project.path.toLowerCase() === params.id.toLowerCase()) {
          this.storageService.projectCounter = index + 1;
          return true;
        }
      });
      if (!this.project) {
        return this.router.navigate(['not-found']);
      }
      this.storageService.lastProject = this.project;
    }, error => console.log(error));
  }

  navigeteToProject(counter: number) {
    this.projectCounter += counter;
    if (this.projectCounter < 1) {
      this.projectCounter = PROJECTS.length;
    }
    if (this.projectCounter > PROJECTS.length) {
      this.projectCounter = 1;
    }
    if (counter === -1) this.createRipple('up');
    if (counter === 1) this.createRipple('down');
    this.router.navigate(['/projects', PROJECTS[this.projectCounter - 1].path]);
  }

  createRipple(direction: string) {
    this.renderer.setStyle(this.rippleProject.nativeElement, 'z-index', '10');
    const width = window.innerWidth;
    const height = window.innerHeight;
    const size = width > height ? width : height;
    let x, y;

    if (direction === 'up') {
      x = size / 2;
      y = size / 2;
    }
    if (direction === 'down') {
      x = size / 2;
      y = -size / 2;
    }

    const ripple = this.renderer.createElement('span');
    const style = {
      'top': y,
      'left': x,
      'height': size,
      'width': size
    };
    this.setRippleStyle(style, ripple);
    this.renderer.appendChild(this.rippleProject.nativeElement, ripple);
  }

  setRippleStyle(style, ripple: HTMLSpanElement) {
    Object.keys(style).forEach(key => {
      this.renderer.setStyle(ripple, `${key}`, `${style[key]}px`);
    });
    setTimeout(() => {
      this.removeRipple();
      this.renderer.setStyle(this.rippleProject.nativeElement, 'z-index', '-1');
    }, 500);
  }

  removeRipple() {
    this.renderer.removeChild(this.rippleProject.nativeElement, this.rippleProject.nativeElement.firstChild);
  }

  ngOnInit() {
    this.matchPath();
    this.projectCounter = this.storageService.projectCounter;
  }

  ngAfterViewInit() {
    // Close the info modal if the window width is greather than 701px
    this.resizeSubscription = this.resizeService.resizeSubject$
    .debounceTime(200)
    .subscribe(event => {
      if (event.innerWidth > 701) {
        this.showRipple = true;
        if (this.infoToggler.nativeElement.getAttribute('aria-expanded') === 'true') {
          if (this.togglerInfoState) {
            this.stateService.toggleNavigation();
            this.togglerInfoState = false;
          }
          this.renderer.setAttribute(this.infoToggler.nativeElement, 'aria-expanded', 'false');
          this.renderer.removeClass(this.projectInfo.nativeElement, 'info-open');
        }
      }
    });
    // Navigate to project by the mousewheel
    this.mouseWheelSubscription.asObservable()
      .throttleTime(500)
      .subscribe((event: MouseWheelEvent) => {
        if (event.deltaY > 0) {
          this.navigeteToProject(1);
        }
        if (event.deltaY < 0) {
          this.navigeteToProject(-1);
        }
    });
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
    this.mouseWheelSubscription.unsubscribe();
    if (this.togglerInfoState) this.stateService.toggleNavigation();
  }

  @HostListener('document:keydown.ArrowLeft')
  @HostListener('swiperight')
  swipeRight() {
    this.router.navigate(['/home']);
  }

  @HostListener('document:keydown.ArrowRight')
  @HostListener('swipeleft')
  swipeLeft() {
    this.router.navigate(['/contact']);
  }

  @HostListener('document:keydown.ArrowDown')
  @HostListener('swipedown')
  navigeteUp() {
    this.navigeteToProject(1);
  }

  @HostListener('document:keydown.ArrowUp')
  @HostListener('swipeup')
  navigeteDown() {
    this.navigeteToProject(-1);
  }

  @HostListener('mousewheel', ['$event'])
  onMouseWheelChrome(event: MouseWheelEvent) {
    this.mouseWheelSubscription.next(event);
  }
}
