import { Component, OnInit, HostListener } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  @HostListener('document:keydown.ArrowLeft')
  navigateToProjects() {
    this.router.navigate(['/projects']);
  }

}
