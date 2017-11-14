import { Component, OnInit, AfterViewChecked, HostListener, HostBinding  } from '@angular/core';

import { Router } from '@angular/router';
import { NavigateService } from '@app/shared';
import { slideBackgroundAnimation } from '@app/shared';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [slideBackgroundAnimation]
})
export class ContactComponent implements OnInit, AfterViewChecked {
  public animState: string = 'out';

  constructor(private router: Router, private navigateService: NavigateService) { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    // Put the state change on the stack for prevent error
    setTimeout(() => {this.animState = 'in'; }, 0);
  }

  @HostListener('document:keydown.ArrowLeft')
  @HostListener('swiperight')
  swipe() {
    this.navigateService.navigateToProjects();
  }

}
