import { 
  Component, 
  OnInit, 
  ElementRef,
  Renderer2, 
  ViewChild, 
  AfterContentInit } from '@angular/core';

import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, AfterContentInit {
  activeIndex: number;
  routerLinks = [
    {
      link: 'main',
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
  public href: string = "";
  
  @ViewChild('navigation') navigation: ElementRef;
  @ViewChild('selector') selector: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private el: ElementRef,
    private renderer: Renderer2) {
  }

  ngAfterContentInit() {
    
  }

  showRoot() {
    console.log('this.router.url', this.router.url)
    
  }
  
  ngOnInit() {
    this.router.events
    .filter((event) => event instanceof NavigationEnd)
    .map(() => this.activatedRoute)
    .map((route) => {
      while (route.firstChild) route = route.firstChild;
      return route;
    })
    .filter((route) => route.outlet === 'primary')
    .mergeMap((route) => route.data)
    .subscribe((event) => {
      console.log('NavigationEnd:', event.state);
    });
  }

  selectActive(event, index) {
    const links = this.routerLinks.map(data => data.link)
    const delay = 0.05,
          init = 1,
          prev = links.indexOf(this.router.url.slice(1)),
          len = this.routerLinks.length,
          diff = index - prev,
          dur = Math.abs(diff)
          
          console.log('this.router.url', this.router.url)
          console.log('prev', prev);
          console.log('index', index);
          console.log(event)
          // console.log(event.path[0].clientHeight)
          // console.log(event.path[0].clientWidth)
          // console.log(event.path[0].classList)
          // console.log(this.el.nativeElement.getBoundingClientRect().top)

          console.log('this.navigation.nativeElement.clientHeight', this.navigation.nativeElement.clientHeight)
          console.log('this.navigation.nativeElement.clientWidth', this.navigation.nativeElement.clientWidth)

          console.log('this.navigation.nativeElement.offsetTop', this.navigation.nativeElement.offsetTop)
          console.log('this.navigation.nativeElement.offsetLeft', this.navigation.nativeElement.offsetLeft)
          
          // console.log('event.path[0].offsetTop', event.path[0].offsetTop)
          // console.log('event.path[0].offsetLeft', event.path[0].offsetLeft)

          // console.log('event.path[0].clientHeight', event.path[0].clientHeight)
          // console.log('event.path[0].clientWidth', event.path[0].clientWidth)

          console.log('event.target.offsetTop', event.target.offsetTop)
          console.log('event.target.offsetLeft', event.target.offsetLeft)

          console.log('event.target.clientHeight', event.target.clientHeight)
          console.log('event.target.clientWidth', event.target.clientWidth)

          console.log('this.selector.nativeElement.clientHeight', this.selector.nativeElement.clientHeight)
          console.log('this.selector.nativeElement.clientWidth', this.selector.nativeElement.clientWidth)

          console.log('this.selector.nativeElement.offsetTop', this.selector.nativeElement.offsetTop)
          console.log('this.selector.nativeElement.offsetLeft', this.selector.nativeElement.offsetLeft)
          
          this.renderer.setStyle(this.selector.nativeElement, `left`, `${event.target.offsetLeft - 3}px`)
  }

}
