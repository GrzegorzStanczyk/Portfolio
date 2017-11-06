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
import { PROJECTS } from '@app/shared';
import { Project } from '@app/shared';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/throttleTime';


@Component({
  selector: 'app-projects',
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

  @ViewChild('projectInfo') projectInfo: ElementRef;
  @ViewChild('infoToggler') infoToggler: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private resizeService: ResizeService,
    private storageService: StorageService,
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
    this.router.navigate(['/projects', PROJECTS[this.projectCounter - 1].path]);
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
        if (this.infoToggler.nativeElement.getAttribute('aria-expanded') === 'true') {
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
  @HostListener('swipeup')
  navigeteUp() {
    this.navigeteToProject(1);
  }

  @HostListener('document:keydown.ArrowUp')
  @HostListener('swipedown')
  navigeteDown() {
    this.navigeteToProject(-1);
  }

  @HostListener('mousewheel', ['$event'])
  onMouseWheelChrome(event: MouseWheelEvent) {
    this.mouseWheelSubscription.next(event);
  }
}
