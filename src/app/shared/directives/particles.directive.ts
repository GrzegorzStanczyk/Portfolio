import { Directive, ElementRef, OnInit, AfterViewInit, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appParticles]'
})
export class ParticlesDirective implements OnInit, AfterViewInit {
  @HostListener('window:resize')
  resize(event) {
    this.setCanvasSize();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(event.target.innerWidth);
  }
  constructor(private el: ElementRef) { }

  ngOnInit() {
    
  }

  setCanvasSize(): void {
    const canvasEl: HTMLCanvasElement = this.el.nativeElement;
    let ctx: CanvasRenderingContext2D = canvasEl.getContext('2d');
    canvasEl.width = window.innerWidth/2;
    canvasEl.height = window.innerHeight;
  }

  ngAfterViewInit() {
    this.setCanvasSize();
  }

}
