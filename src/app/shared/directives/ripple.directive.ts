import { Directive, ElementRef, Renderer2, AfterViewInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appRipple]'
})
export class RippleDirective implements AfterViewInit {
  private rippleContainer: HTMLDivElement;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.createRippleContainer();
  }

  createRippleContainer() {
    this.rippleContainer = this.renderer.createElement('div');
    this.renderer.appendChild(this.el.nativeElement, this.rippleContainer);
  }

  createRipple(event) {
    event.stopPropagation();
    if (this.rippleContainer.firstChild) {
      this.removeRipple();
    }

    const width = this.el.nativeElement.offsetWidth;
    const height = this.el.nativeElement.offsetHeight;
    const size = width > height ? width : height;
    const pos = this.el.nativeElement.getBoundingClientRect();
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
  }
}
