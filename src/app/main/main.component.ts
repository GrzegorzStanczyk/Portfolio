import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

import { Router } from '@angular/router';

import { NavigateService } from '@app/shared';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public message: string = 'Inspirations are everywhere';

  constructor(
    private router: Router,
    private navigateService: NavigateService) { }

  @HostListener('document:keydown.ArrowRight')
  @HostListener('swipeleft')
  swipe() {
    this.navigateService.navigateToProjects();
  }

  ngOnInit() {}
}
