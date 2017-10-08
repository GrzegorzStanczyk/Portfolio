import { Directive, ElementRef, OnInit, AfterViewInit, HostListener, Input } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/throttleTime';

@Directive({
  selector: '[appParticles]'
})

export class ParticlesDirective implements OnInit, AfterViewInit {
  private resizeEvent$: Subject<MouseEvent> = new Subject<MouseEvent>();

  constructor(private el: ElementRef) { }

  setCanvasSize(ev?): void {
    if(ev) console.log(ev.target.innerWidth);
    
    const canvasEl: HTMLCanvasElement = this.el.nativeElement;
    let ctx: CanvasRenderingContext2D = canvasEl.getContext('2d');
    canvasEl.width = window.innerWidth/2;
    canvasEl.height = window.innerHeight;
  }

  ngOnInit() {
    this.resizeEvent$.throttleTime(200).subscribe(event => this.setCanvasSize(event));
  }

  ngAfterViewInit() {
    this.setCanvasSize();
  }

  @HostListener('window:resize', ['$event'])
  resize(event) {
    this.resizeEvent$.next(event);
  }
}
