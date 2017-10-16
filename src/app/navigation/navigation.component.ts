import { 
  Component, 
  OnInit, 
  ElementRef,
  Renderer2, 
  ViewChild,  
  ViewChildren,
  QueryList,
  AfterViewInit } from '@angular/core';

import { Router, NavigationStart, NavigationEnd, ActivatedRoute, Event } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/pairwise';

import { Subscription }   from 'rxjs/Subscription';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, AfterViewInit {
  @ViewChild('navigation') navigation: ElementRef;
  @ViewChild('selector') selector: ElementRef;
  @ViewChildren('navigationLink') navigationLink:QueryList<any>;

  subscriptionToSelectorPosition: Subscription;
  activeUrl: string;
  activeRoute: Object;

  routerLinks = [
    {
      link: 'home',
      name: 'Home'
    },
    {
      link: 'projects',
      name: 'Projects'
    }, 
    {
      link: 'contact',
      name: 'Contact'
    }
  ];

  selectorSize = {
    width: 8,
    height: 8
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private el: ElementRef,
    private renderer: Renderer2) {
  }

  setSelectorPosition(activeRoute): void {
    if(activeRoute) {
      this.renderer.setStyle(this.selector.nativeElement, `width`, `${activeRoute.nativeElement.offsetWidth + this.selectorSize.width}px`)
      this.renderer.setStyle(this.selector.nativeElement, `height`, `${activeRoute.nativeElement.offsetHeight + this.selectorSize.height}px`);
      this.renderer.setStyle(this.selector.nativeElement, `left`, `${activeRoute.nativeElement.offsetLeft - this.selectorSize.height/2}px`);
      this.renderer.setStyle(this.selector.nativeElement, `top`, `${activeRoute.nativeElement.offsetTop - this.selectorSize.height/2}px`);
    }
  }

  animateRouterLink(activeRoute, obj) {
    const links = this.routerLinks.map(data => data.link)
    const prev = links.indexOf(obj.prev);
    const curr = links.indexOf(obj.curr);
    const len = this.routerLinks.length;
    const diff = curr - prev;
    const delay = 0.05;
    let init = 1;
    let dur = Math.abs(diff);
    
    if(diff > 0) {
      for(let i = prev; i < curr; i++) {
        dur = delay*init;
        let element = this.navigationLink["_results"][i].nativeElement;
        this.animateDirection(dur, 'animate-right', element);
        init = init+1;
      }
    }

    if(diff < 0) {
      for(let i = prev; i > curr; i--) {
        dur = delay*init;
        let element = this.navigationLink["_results"][i].nativeElement;
        this.animateDirection(dur, 'animate-left', element);
        init = init+1;
      }
    }
    this.animateMove();
  }

  animateDirection(dur, anim, elem) {
    this.renderer.addClass(elem, anim);
    this.renderer.setStyle(elem, 'animation-delay', `${dur}s`)
    setTimeout(()=>{
      this.renderer.removeClass(elem, anim);
    }, 700)
  }

  animateMove() {
    this.renderer.addClass(this.selector.nativeElement, 'animate');
    setTimeout(()=>{
      this.renderer.removeClass(this.selector.nativeElement, 'animate');
    }, 500)
  }

  findActiveRoute(event): Object {
    this.activeUrl = event.slice(1);
    return this.navigationLink.find((value) => {
      if(value.nativeElement.textContent.toLowerCase() === this.activeUrl.toLowerCase()) {
        return value;
      }
    })
  }

  ngAfterViewInit() {
    // Find initialized route and set selector
    this.subscriptionToSelectorPosition = this.router.events
    .filter((event: Event) => event instanceof NavigationEnd)
    .map((event: any) => event.urlAfterRedirects)
    .subscribe((event: NavigationEnd) => {
        this.activeRoute = this.findActiveRoute(event);
        this.setSelectorPosition(this.activeRoute);

        // Unsubscribe after setting the selector position 
        this.subscriptionToSelectorPosition.unsubscribe();
    });

    // Get previous and current route
    this.router.events
      .filter((event: Event) => event instanceof NavigationEnd)
      .map((event: any) => event.urlAfterRedirects)
      .pairwise()
      .subscribe((event) => {
        
        let obj = {
          prev: event[0].slice(1),
          curr: event[1].slice(1)
        }

        this.activeRoute = this.findActiveRoute(event[1]);
        this.setSelectorPosition(this.activeRoute);
        this.animateRouterLink(this.activeRoute, obj);
      });
  }

  ngOnInit() {}
}
