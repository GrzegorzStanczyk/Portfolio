import { Component, OnInit, HostListener } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  @HostListener('document:keydown.ArrowLeft')
  navigeteToMain() {
    this.router.navigate(['/main']);
  }
  @HostListener('document:keydown.ArrowRight')
  navigeteToContact() {
    this.router.navigate(['/contact'])
  }
}
