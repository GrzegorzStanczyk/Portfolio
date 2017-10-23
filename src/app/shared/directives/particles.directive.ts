import { Directive, ElementRef, OnInit, AfterViewInit, OnDestroy, Input, NgZone } from '@angular/core';

import { ResizeService } from '@app/shared';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

@Directive({
  selector: '[appParticles]'
})

export class ParticlesDirective implements OnInit, AfterViewInit, OnDestroy {
  private resizeSubscription: Subscription;
  private canvasEl: HTMLCanvasElement = this.el.nativeElement;
  private ctx: CanvasRenderingContext2D = this.canvasEl.getContext('2d');
  private maxParticlesAmount: number = 500;
  private particlesSpeed: number = 2;
  private particlesArray: Array<any> = [];
  private particleInterval: number = 1000;
  private clearInterval;
  private animationFrame;
  private colorsArray: Array<string> = [
      "#00d1cb", "#ff4699", "#fbb63a", "#b3dc5b", "#ffe100"
  ];

  constructor(
    private el: ElementRef, 
    private ngZone: NgZone,
    private resizeService: ResizeService) { }

  // @HostListener('document:mousedown', ['$event'])
  // speedUp(event) {
  //   console.log(event)
  //   this.particleInterval = 50;
  //   this.particlesSpeed = 10;
  //   clearInterval(this.clearInterval);
  //   this.particleDrawDelay()
  // }
  // @HostListener('document:mouseup', ['$event'])
  // speedDown(event) {
  //   console.log(event)
  //   this.particleInterval = 1000;
  //   this.particlesSpeed = 2;
  //   clearInterval(this.clearInterval);
  //   this.particleDrawDelay()
  // }

  setCanvasSize(): void {
    this.canvasEl.width = window.innerWidth;
    this.canvasEl.height = window.innerHeight;
  }

  clearCanvas(): void {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  whetherCanvasIsFull(): Array<{any}> {
    return this.particlesArray.filter(p => {
      return p.x > p.r * -1;
    });
  }

  createParticle(): void {
    // If particle is outside of canvas filter it outside
    let particlesInRange = this.whetherCanvasIsFull();
    // Do not create new particle if canvas is full
    if(particlesInRange.length >= this.maxParticlesAmount) return;
    
    let p = {
      y: null,
      r: Math.floor(Math.random() * 20) + 3,
      x: window.innerWidth,
      direction: 0.1,
      color: this.colorsArray[Math.floor(Math.random() * this.colorsArray.length)]
    }

    // Prevent delete particles from canvas if they are in it
    this.particlesArray = particlesInRange;

    // Set initial particles outside the canvas
    p.x += p.r;
    // Set initial particles on y axis in range
    p.y = Math.random() * (window.innerHeight - p.r - p.r + 1) + p.r; 

    this.particlesArray.push(p);
  }

  animateParticles(p): any {
      // Set particle speed depend on its size
      p.x -= this.particlesSpeed/p.r;
      // Change particle direction || Bounce from horizontal lines 
      if(Math.floor(Math.random()*500) === 250 || p.y >= window.innerHeight - p.r || p.y <= 0 + p.r) {
        p.direction = p.direction * -1
      }
      p.y += p.direction;
  }

  drawParticles(p): void {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();
  }

  particleDrawDelay(): void {
    setTimeout(()=>{
      this.clearInterval = setInterval(() => this.createParticle(), this.particleInterval);
    }, 2000)
  }

  loop() {
    this.clearCanvas();
    this.particlesArray.forEach(p => {
      this.animateParticles(p);
      this.drawParticles(p);
    })
    this.animationFrame = requestAnimationFrame(() => this.loop());
  }

  stopCreatingParticles(): void {
    clearInterval(this.clearInterval);
  }

  stopAnimationFrame(): void {
    cancelAnimationFrame(this.animationFrame);
  }

  ngOnInit() {
    this.resizeSubscription = this.resizeService.resizeSubject$
    .debounceTime(200)
    .subscribe(event => {
      this.stopAnimationFrame();
      this.particlesArray = [];
      this.setCanvasSize();
    // Paint loop run outside the Angular zone
      this.ngZone.runOutsideAngular(()=>this.loop());
    });
  }

  ngAfterViewInit() {
    this.setCanvasSize();
    this.particleDrawDelay();
    // Paint loop run outside the Angular zone
    this.ngZone.runOutsideAngular(()=>this.loop());
  }

  ngOnDestroy() {
    this.stopCreatingParticles();
    this.stopAnimationFrame();
    this.resizeSubscription.unsubscribe();
  }
}
