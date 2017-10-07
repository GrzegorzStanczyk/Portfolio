import { Component, OnInit } from '@angular/core';

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

  constructor(private router: Router) {}

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
          // console.log(this.router.url)
  }

}
