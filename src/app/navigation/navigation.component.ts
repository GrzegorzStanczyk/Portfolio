import { 
  Component, 
  OnInit, 
  ElementRef,
  Renderer2, 
  ViewChild,  
  ViewChildren,
  QueryList,
  AfterContentInit,
  AfterViewInit } from '@angular/core';

import { Router, NavigationStart, NavigationEnd, ActivatedRoute, Event } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/pairwise';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, AfterContentInit, AfterViewInit {
  activeRoute: string;
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
  
  @ViewChild('navigation') navigation: ElementRef;
  @ViewChild('selector') selector: ElementRef;
  @ViewChildren('navigationLink') navigationLink:QueryList<any>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private el: ElementRef,
    private renderer: Renderer2) {
  }

  setSelectorPosition(activeRoute) {
    if(activeRoute) {
      this.renderer.setStyle(this.selector.nativeElement, `left`, `${activeRoute.nativeElement.offsetLeft - 3}px`)
    }
  }

  ngAfterViewInit() {
    // Find initialized route and set selector
    this.router.events
    .filter((event: Event) => event instanceof NavigationEnd)
    .subscribe((e: NavigationEnd) => {
      this.activeRoute = e.urlAfterRedirects.slice(1);
      let v = this.navigationLink.find((value) => {
        if(value.nativeElement.textContent.toLowerCase() === this.activeRoute.toLowerCase()) {
          return value;
        }
      })
      this.setSelectorPosition(v);
    });
  }

  ngAfterContentInit() {

  }

  // showRoot() {
  //   console.log('this.router.url', this.router.url)
    
  // }

  // getPrevAndCurrRoute() {
  //   return this.router.events
  //   .filter((event: Event) => event instanceof NavigationEnd)
  //   .map((event: any) => event.urlAfterRedirects)
  //   .pairwise()
  //   .subscribe((event) => {
  //     return {
  //       prev: `${event[0]}`,
  //       curr: `${event[1]}`
  //     }
  //   });
  // }

  ngOnInit() {
    
    
    
    // this.router.events
    // .filter((event) => event instanceof NavigationEnd)
    // .map(() => this.activatedRoute)
    // .map((route) => {
    //   while (route.firstChild) route = route.firstChild;
    //   return route;
    // })
    // .filter((route) => route.outlet === 'primary')
    // .mergeMap((route) => route.data)
    // .subscribe((event) => {
    //   console.log('NavigationEnd:', event.state);
    // });
  }

 

  selectActive(event, index) {
    const links = this.routerLinks.map(data => data.link)
    const prev = links.indexOf(this.router.url.slice(1));

    // const route = this.getPrevAndCurrRoute()
    // console.log(route)
    const len = this.routerLinks.length;
    const diff = index - prev;
    if(diff === 0) return;
    const delay = 0.05;
    const init = 1;
    const dur = Math.abs(diff);

          if(diff > 0) {

          }

          if(diff < 0) {

          }

          // console.log('this.router.url', this.router.url)
          // console.log('prev', prev);
          // console.log('index', index);
          // console.log(event)
          // // console.log(event.path[0].clientHeight)
          // // console.log(event.path[0].clientWidth)
          // // console.log(event.path[0].classList)
          // // console.log(this.el.nativeElement.getBoundingClientRect().top)

          // console.log('this.navigation.nativeElement.clientHeight', this.navigation.nativeElement.clientHeight)
          // console.log('this.navigation.nativeElement.clientWidth', this.navigation.nativeElement.clientWidth)

          // console.log('this.navigation.nativeElement.offsetTop', this.navigation.nativeElement.offsetTop)
          // console.log('this.navigation.nativeElement.offsetLeft', this.navigation.nativeElement.offsetLeft)
          
          // // console.log('event.path[0].offsetTop', event.path[0].offsetTop)
          // // console.log('event.path[0].offsetLeft', event.path[0].offsetLeft)

          // // console.log('event.path[0].clientHeight', event.path[0].clientHeight)
          // // console.log('event.path[0].clientWidth', event.path[0].clientWidth)

          // console.log('event.target.offsetTop', event.target.offsetTop)
          // console.log('event.target.offsetLeft', event.target.offsetLeft)

          // console.log('event.target.clientHeight', event.target.clientHeight)
          // console.log('event.target.clientWidth', event.target.clientWidth)

          // console.log('this.selector.nativeElement.clientHeight', this.selector.nativeElement.clientHeight)
          // console.log('this.selector.nativeElement.clientWidth', this.selector.nativeElement.clientWidth)

          // console.log('this.selector.nativeElement.offsetTop', this.selector.nativeElement.offsetTop)
          // console.log('this.selector.nativeElement.offsetLeft', this.selector.nativeElement.offsetLeft)
          
          // // this.renderer.setStyle(this.selector.nativeElement, `left`, `${event.target.offsetLeft - 3}px`)
          // this.renderer.addClass(event.target, 'animate-right');
          // setTimeout(()=>{
          //   this.renderer.removeClass(event.target, 'animate-right');
          // }, 700)

          // this.renderer.setStyle(this.selector.nativeElement, `left`, `${event.target.offsetLeft - 3}px`)
          // this.renderer.addClass(this.selector.nativeElement, 'animate');
          // setTimeout(()=>{
          //   this.renderer.removeClass(this.selector.nativeElement, 'animate');
          // }, 700)

  }

}
