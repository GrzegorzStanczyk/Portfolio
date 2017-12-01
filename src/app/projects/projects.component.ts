import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  HostListener,
  EventEmitter,
  ElementRef,
  Renderer2,
  ViewChild,
  ViewChildren,
  QueryList, } from '@angular/core';

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
  @ViewChild('projectInfo') projectInfo: ElementRef;
  @ViewChild('infoToggler') infoToggler: ElementRef;
  @ViewChild('rippleProject') rippleProject: ElementRef;
  @ViewChild('navigation') navigation: ElementRef;
  @ViewChild('selector') selector: ElementRef;
  @ViewChildren('navigationLink') navigationLink: QueryList<any>;

  private resizeSubscription: Subscription;
  private togglerInfoState: boolean = false;
  private mouseWheelSubscription = new Subject<MouseWheelEvent>();
  private projectsNavigationSubscription = new Subject<number>();
  private lastProjectCounter: number;
  public projectCounter: number = null || 1;
  public project: Project;
  public projects: Project[] = PROJECTS;
  public showRipple = true;

  private selectorSize = {
    width: 10,
    height: 10
  };

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
          this.lastProjectCounter = this.storageService.projectCounter;
          this.storageService.projectCounter = this.projectCounter = index + 1;
          setTimeout(() => {
            this.setSelectorPosition(this.navigationLink['_results'][this.projectCounter - 1].nativeElement);
            this.animateRouterLink();
          }, 0);
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

  // Pagination
  setSelectorPosition(activeRoute): void {
    if (activeRoute) {
      this.renderer.setStyle(this.selector.nativeElement, `width`, `${activeRoute.offsetWidth + this.selectorSize.width}px`);
      this.renderer.setStyle(this.selector.nativeElement, `height`, `${activeRoute.offsetHeight + this.selectorSize.height}px`);
      this.renderer.setStyle(this.selector.nativeElement, `left`, `${activeRoute.offsetLeft - this.selectorSize.width / 2}px`);
      this.renderer.setStyle(this.selector.nativeElement, `top`, `${activeRoute.offsetTop - this.selectorSize.height / 2}px`);
    }
  }

  animateRouterLink() {
    const len = this.navigationLink.length;
    const curr = this.projectCounter;
    const prev = this.lastProjectCounter;
    if (!prev) return;
    const diff = curr - prev;
    const delay = 0.05;
    let init = 1;
    let dur = Math.abs(diff);

    if (diff > 0) {
      for (let i = prev; i < curr; i++) {
        dur = delay * init;
        const element = this.navigationLink['_results'][i - 1].nativeElement;
        this.animateDirection(dur, 'animate-up', element);
        init = init + 1;
      }
    }

    if (diff < 0) {
      for (let i = prev; i  > curr; i--) {
        dur = delay * init;
        const element = this.navigationLink['_results'][i - 1].nativeElement;
        this.animateDirection(dur, 'animate-down', element);
        init = init + 1;
      }
    }
    if (diff !== 0) this.animateMove();
  }

  animateDirection(dur, anim, elem) {
    this.renderer.addClass(elem, anim);
    this.renderer.setStyle(elem, 'animation-delay', `${dur}s`);
    const timer = 900 + dur * 100;
    setTimeout(() => {
      this.renderer.removeClass(elem, anim);
    }, timer);
  }

  animateMove() {
    this.renderer.addClass(this.selector.nativeElement, 'animate');
    setTimeout(() => {
      this.renderer.removeClass(this.selector.nativeElement, 'animate');
    }, 500);
  }
  // Pagination - end

  ngOnInit() {
    this.matchPath();
  }

  ngAfterViewInit() {
    // Close the info modal if the window width is greather than 701px
    this.resizeSubscription = this.resizeService.resizeSubject$
    .debounceTime(200)
    .subscribe(event => {
      this.setSelectorPosition(this.navigationLink['_results'][this.projectCounter - 1].nativeElement);
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
    this.projectsNavigationSubscription.asObservable()
    .throttleTime(500)
    .subscribe((event: number) => {
      if (event > 0) {
        this.navigeteToProject(event);
      }
      if (event < 0) {
        this.navigeteToProject(event);
      }
  });
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
    this.mouseWheelSubscription.unsubscribe();
    this.projectsNavigationSubscription.unsubscribe();
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
    this.projectsNavigationSubscription.next(1);
  }

  @HostListener('document:keydown.ArrowUp')
  @HostListener('swipeup')
  navigeteDown() {
    this.projectsNavigationSubscription.next(-1);
  }

  @HostListener('mousewheel', ['$event'])
  onMouseWheelChrome(event: MouseWheelEvent) {
    this.mouseWheelSubscription.next(event);
  }
}
