import { Directive, ElementRef, OnInit, AfterViewInit, HostListener, Input } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/throttleTime';

@Directive({
  selector: '[appParticles]'
})

export class ParticlesDirective implements OnInit, AfterViewInit {
  private resizeEvent$: Subject<MouseEvent> = new Subject<MouseEvent>();
  private canvasEl: HTMLCanvasElement = this.el.nativeElement;
  private ctx: CanvasRenderingContext2D = this.canvasEl.getContext('2d');
  private numberOfParticles: number = 5;
  private particlesArray: Array<any> = [];
  private clearTimeout: Array<any> = [];
  private colorsArray: Array<string> = [
      "#00d1cb", "#ff4699", "#fbb63a", "#b3dc5b", "#ffe100"
  ];

  myReq = requestAnimationFrame(() => this.loop());
  pause = null;

  constructor(private el: ElementRef) { }

  setCanvasSize(): void {
    this.canvasEl.width = window.innerWidth/2;
    this.canvasEl.height = window.innerHeight;
  }

  clearCanvas(): void {
    this.ctx.clearRect(0, 0, window.innerWidth/2, window.innerHeight);
  }

  createParticles(): void {
    // if(this.particlesArray.length > 100) {this.particlesArray.shift();}
    if(this.particlesArray.length > 100) return 
    
    let p = {
      x: window.innerWidth/2,
      y: Math.random() * window.innerHeight,
      r: Math.floor(Math.random() * 10) + 1,
      color: this.colorsArray[Math.floor(Math.random() * this.colorsArray.length)]
    }
    this.particlesArray.push(p)
  }

  animateParticles(): any {
    this.particlesArray.forEach(p => {
      p.x -= 0.1;
      p.y += (Math.random() - 0.5)*0.2;
    })
  }


  drawParticles(): void {
    // for(let i = 1; i < this.numberOfParticles; i++) {
      // this.clearTimeout.push(
        // setTimeout(()=> {
          this.particlesArray.forEach(p => {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
          })
        // }, i * 2000)
      // )
    // }
  }



  // drawParticles(): void {
  //   for(let i = 1; i < this.numberOfParticles; i++) {
  //     // let x = Math.random() * window.innerWidth;
  //     // let p = {
  //     //   x: window.innerWidth/2,
  //     //   y: Math.random() * window.innerHeight,
  //     //   r: Math.floor(Math.random() * 10) + 1
  //     // }

  //     this.clearTimeout.push(
  //       setTimeout(()=> {

  //         let p = {
  //           x: window.innerWidth/2,
  //           y: Math.random() * window.innerHeight,
  //           r: Math.floor(Math.random() * 10) + 1
  //         }

  //         this.particlesArray.push(p)

  //         this.ctx.beginPath();
  //         this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
  //         this.ctx.fillStyle = this.colorsArray[Math.floor(Math.random() * this.colorsArray.length)];
  //         this.ctx.fill();

  //   this.animateParticles();
          
  //       }, i * 2000)
  //     )
  //   }
  // }

  cancelDraw(): void {
    this.clearTimeout.forEach(particle => clearTimeout(particle));
  }

  ngOnInit() {
    this.resizeEvent$.throttleTime(200)
    .subscribe(event => {
      // this.animateParticles()
      // this.cancelDraw();
      // this.clearCanvas();
      // this.pause = true;
      cancelAnimationFrame(this.myReq)
      this.setCanvasSize();
      // this.drawParticles();
      // this.pause = undefined;
      this.particlesArray = [];
      this.loop();
    });
  }

  loop() {
    if(this.pause) return;
    this.clearCanvas();
    this.createParticles();
    this.animateParticles();
    this.drawParticles();
    this.myReq = requestAnimationFrame(() => this.loop());
  }

  ngAfterViewInit() {
    this.setCanvasSize();
    this.loop();
  }

  @HostListener('window:resize')
  resize() {
    this.resizeEvent$.next();
  }
}
