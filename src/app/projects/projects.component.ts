import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ElementRef,
  Renderer2,
  ViewChild } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { ResizeService } from '@app/shared';
import { StorageService } from '@app/shared';
import { PROJECTS } from '@app/shared';
import { Project } from '@app/shared';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private resizeSubscription: Subscription;
  private togglerInfoState: boolean = false;
  public project: Project;

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
          this.storageService.projectCounter = index;
          return true;
        }
      });
      if (!this.project) {
        return this.router.navigate(['not-found']);
      }
      this.storageService.lastProject = this.project;
    }, error => console.log(error));
  }

  toggleProject() {
    if (this.storageService.projectCounter >= PROJECTS.length - 1) {
      this.storageService.projectCounter = -1;
    }
    this.router.navigate(['/projects', PROJECTS[this.storageService.projectCounter + 1].path]);
  }

  ngOnInit() {
    this.matchPath();

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
    this.router.navigate(['/contact']);
  }
  @HostListener('document:keydown.ArrowDown')
  navigeteUp() {
    if (this.storageService.projectCounter >= PROJECTS.length - 1) {
      this.storageService.projectCounter = -1;
    }
    this.router.navigate(['/projects', PROJECTS[this.storageService.projectCounter + 1].path]);
  }
  @HostListener('document:keydown.ArrowUp')
  navigeteDown() {
    if (this.storageService.projectCounter <= 0) {
      this.storageService.projectCounter = PROJECTS.length;
    }
    this.router.navigate(['/projects', PROJECTS[this.storageService.projectCounter - 1].path]);
  }
}



