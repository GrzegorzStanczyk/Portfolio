import { Component, OnInit, HostListener } from '@angular/core';

import { Router } from '@angular/router';
import { NavigateService } from '@app/shared';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private router: Router, private navigateService: NavigateService) { }

  ngOnInit() {
  }

  @HostListener('document:keydown.ArrowLeft')
  navigate() {
    this.navigateService.navigateToProjects();
  }

}
