import { Component, OnInit, AfterViewChecked, HostListener, HostBinding  } from '@angular/core';

import { NavigateService } from '@app/shared';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewChecked {
  public title: string = '';
  public email: string = '';
  public message: string = '';

  constructor(private navigateService: NavigateService) { }

  ngOnInit() {
  }

  log() {
    console.log(this.title)
  }

  ngAfterViewChecked() {
  }

  @HostListener('document:keydown.ArrowLeft')
  @HostListener('swiperight')
  swipe() {
    this.navigateService.navigateToProjects();
  }

}
