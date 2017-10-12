import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
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
  @ViewChild('navigation') navigation: ElementRef;
  @ViewChild('selector') selector: ElementRef;

  constructor(private router: Router, private el: ElementRef) {}

  ngOnInit() {
  }

  selectActive(event, index) {
    const links = this.routerLinks.map(data => data.link)
    const delay = 0.05,
          init = 1,
          prev = links.indexOf(this.router.url.slice(1)),
          len = this.routerLinks.length,
          diff = index - prev,
          dur = Math.abs(diff)
          
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
          
          console.log('event.path[0].offsetTop', event.path[0].offsetTop)
          console.log('event.path[0].offsetLeft', event.path[0].offsetLeft)

          console.log('event.path[0].clientHeight', event.path[0].clientHeight)
          console.log('event.path[0].clientWidth', event.path[0].clientWidth)

          console.log('this.selector.nativeElement.clientHeight', this.selector.nativeElement.clientHeight)
          console.log('this.selector.nativeElement.clientWidth', this.selector.nativeElement.clientWidth)

          console.log('this.selector.nativeElement.offsetTop', this.selector.nativeElement.offsetTop)
          console.log('this.selector.nativeElement.offsetLeft', this.selector.nativeElement.offsetLeft)
  }

}
