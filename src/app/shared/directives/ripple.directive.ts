import { Directive, ElementRef, Renderer2, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appRipple]'
})
export class RippleDirective implements OnInit {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2) { }
    private rippleContainer: HTMLDivElement;
    private ripple: HTMLSpanElement;

  ngOnInit() {
    this.createRippleContainer();
  }

  createRippleContainer() {
    this.rippleContainer = this.renderer.createElement('div');
    this.renderer.appendChild(this.el.nativeElement, this.rippleContainer);
  }

  createRipple(event) {
    if (this.rippleContainer.firstChild) {
      this.removeRipple();
    }
    const width = event.target.offsetWidth;
    const height = event.target.offsetHeight;
    const size = width > height ? width : height;
    const pos = event.target.getBoundingClientRect();
    const x = event.pageX - pos.left - (size / 2);
    const y = event.pageY - pos.top - (size / 2);
    const ripple = this.renderer.createElement('span');
    const style = {
      'top': y,
      'left': x,
      'height': size,
      'width': size
    };
    this.setRippleStyle(style, ripple);
    this.renderer.appendChild(this.rippleContainer, ripple);
  }

  setRippleStyle(style, ripple: HTMLSpanElement) {
    Object.keys(style).forEach(key => {
      this.renderer.setStyle(ripple, `${key}`, `${style[key]}px`);
    });
  }

  removeRipple() {
    this.renderer.removeChild(this.rippleContainer, this.rippleContainer.firstChild);
  }

  @HostListener('click', ['$event'])
  click(event) {
    this.createRipple(event);
    setTimeout(() => {
      // this.removeRipple();
    }, 2000);
  }
}
