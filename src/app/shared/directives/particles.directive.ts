import { Directive, ElementRef, OnInit, AfterViewInit, OnDestroy, HostListener, Input } from '@angular/core';

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
  private particlesArray: Array<any> = [];
  private clearInterval;
  private animationFrame;
  private colorsArray: Array<string> = [
      "#00d1cb", "#ff4699", "#fbb63a", "#b3dc5b", "#ffe100"
  ];

  constructor(private el: ElementRef) { }

  @HostListener('window:resize')
  resize() {
    this.resizeEvent$.next();
  }

  setCanvasSize(): void {
    this.canvasEl.width = window.innerWidth/2;
    this.canvasEl.height = window.innerHeight;
  }

  clearCanvas(): void {
    this.ctx.clearRect(0, 0, window.innerWidth/2, window.innerHeight);
  }

  createParticle(): void {
    if(this.particlesArray.length > 100) {this.particlesArray.shift();}
    let p = {
      y: Math.random() * window.innerHeight,
      r: Math.floor(Math.random() * 20) + 3,
      x: window.innerWidth/2,
      color: this.colorsArray[Math.floor(Math.random() * this.colorsArray.length)]
    }
    p.x += p.r;
    this.particlesArray.push(p)
  }

  animateParticles(): any {
    this.particlesArray.forEach(p => {
      p.x -= 2/p.r;
      p.y += (Math.random() - 0.5)*0.2;
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
      this.loop();
    });
  }

  ngAfterViewInit() {
    this.setCanvasSize();
    this.particleDrawDelay();
    this.loop();
  }

  ngOnDestroy() {
    this.stopCreatingParticles();
    this.stopAnimationFrame();
  }
}
