import { Directive, ElementRef, OnInit, AfterViewInit, OnDestroy, HostListener, Input, NgZone } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Directive({
  selector: '[appParticles]'
})

export class ParticlesDirective implements OnInit, AfterViewInit, OnDestroy {
  private resizeEvent$: Subject<MouseEvent> = new Subject<MouseEvent>();
  private canvasEl: HTMLCanvasElement = this.el.nativeElement;
  private ctx: CanvasRenderingContext2D = this.canvasEl.getContext('2d');
  private numberOfParticles: number = 100;
  private particlesSpeed: number = 2;
  private particlesArray: Array<any> = [];
  private clearInterval;
  private animationFrame;
  private colorsArray: Array<string> = [
      "#00d1cb", "#ff4699", "#fbb63a", "#b3dc5b", "#ffe100"
  ];

  constructor(private el: ElementRef, private ngZone: NgZone) { }

  @HostListener('window:resize')
  resize() {
    this.resizeEvent$.next();
  }

  setCanvasSize(): void {
    this.canvasEl.width = window.innerWidth;
    this.canvasEl.height = window.innerHeight;
  }

  clearCanvas(): void {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  createParticle(): void {
    // If particle amount is more than this.numberOfParticles delete first one
    if(this.particlesArray.length > this.numberOfParticles) this.particlesArray.shift()
    // If particle is outside of canvas delete it
    // this.particlesArray = this.particlesArray.filter(p => {
    //   return p.x > p.r * -1;
    // });

    let p = {
      y: null,
      r: Math.floor(Math.random() * 20) + 3,
      x: window.innerWidth,
      direction: 0.1,
      color: this.colorsArray[Math.floor(Math.random() * this.colorsArray.length)]
    }
    // Set initial particles outside the canvas
    p.x += p.r;
    // Set initial particles on y axis in range
    p.y = Math.random() * (window.innerHeight - p.r - p.r + 1) + p.r; 

    this.particlesArray.push(p);
    console.log(this.particlesArray.length)
  }

  animateParticles(): any {
    this.particlesArray.forEach(p => {
    // Set particle speed depend on its size
      p.x -= this.particlesSpeed/p.r;
      // Change particle direction
      if(Math.floor(Math.random()*500) === 250) {
        p.direction = p.direction * -1;
      }
      // Bounce from horizontal lines 
      if(p.y >= window.innerHeight - p.r || p.y <= 0 + p.r) {
        p.direction = p.direction * -1
      };
      p.y += p.direction;
    })
  }

  drawParticles(): void {
    this.particlesArray.forEach(p => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();
    })
  }

  particleDrawDelay(): void {
    setTimeout(()=>{
      this.clearInterval = setInterval(() => this.createParticle(), 2000);
    }, 2000)
  }

  loop() {
    this.clearCanvas();
    this.animateParticles();
    this.drawParticles();
    this.animationFrame = requestAnimationFrame(() => this.loop());
  }

  stopCreatingParticles(): void {
    clearInterval(this.clearInterval);
  }

  stopAnimationFrame(): void {
    cancelAnimationFrame(this.animationFrame);
  }

  ngOnInit() {
    this.resizeEvent$
    .debounceTime(200)
    .subscribe(event => {
      this.stopAnimationFrame();
      this.particlesArray = [];
      this.setCanvasSize();
    // Paint loop run outside the Angular zone
      this.ngZone.runOutsideAngular(()=>this.loop())
    });
  }

  ngAfterViewInit() {
    this.setCanvasSize();
    this.particleDrawDelay();
    // Paint loop run outside the Angular zone
    this.ngZone.runOutsideAngular(()=>this.loop())
  }

  ngOnDestroy() {
    this.stopCreatingParticles();
    this.stopAnimationFrame();
  }
}
