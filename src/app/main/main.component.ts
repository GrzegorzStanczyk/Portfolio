import { Component, OnInit, HostListener } from '@angular/core';

import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  message: string = "Inspirations are everywhere";
  showCanvas: boolean = true;
  private resizeEvent$: Subject<boolean> = new Subject<boolean>();
  
  constructor(private router: Router) { }

  @HostListener('document:keydown.ArrowRight')
  navigeteToTheRoute() {
    this.router.navigate(['/projects']);
  }

  @HostListener('window:resize', ['$event'])
  canvasState(event): void {
    event.target.innerWidth <= 700 ? this.resizeEvent$.next(true) : this.resizeEvent$.next(false)
  }

  canvasInit() {
    window.innerWidth <= 700 ? this.showCanvas = true : this.showCanvas = false;
  }

  ngOnInit() {
    this.canvasInit();
    this.resizeEvent$
    .debounceTime(200)
    .subscribe(event => this.showCanvas = event);
  }
}
