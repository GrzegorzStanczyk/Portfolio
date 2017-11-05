import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

import { Router } from '@angular/router';

import { ResizeService } from '@app/shared';
import { NavigateService } from '@app/shared';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  public message: string = 'Inspirations are everywhere';
  public showCanvas: boolean = true;
  private resizeSubscription: Subscription;

  constructor(
    private router: Router,
    private resizeService: ResizeService,
    private navigateService: NavigateService) { }

  @HostListener('document:keydown.ArrowRight')
  navigate() {
    this.navigateService.navigateToProjects();
  }

  @HostListener('swipeleft')
  swipe() {
    this.navigateService.navigateToProjects();
  }

  private canvasState(event = window): boolean {
    return event.innerWidth <= 700 ? true : false;
  }

  ngOnInit() {
    this.showCanvas = this.canvasState();
    this.resizeSubscription = this.resizeService.resizeSubject$
    .debounceTime(200)
    .subscribe(event => this.showCanvas = this.canvasState(event));
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }
}
