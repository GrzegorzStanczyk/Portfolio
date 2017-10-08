import { Component, OnInit, HostListener } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  message: string = "Inspirations are everywhere";
  constructor(private router: Router) { }

  @HostListener('document:keydown.ArrowRight')
  navigeteToTheRoute() {
    this.router.navigate(['/projects']);
  }

  ngOnInit() {
  }

}
