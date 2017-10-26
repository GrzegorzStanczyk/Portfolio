import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from './storage.service';

@Injectable()
export class NavigateService {

  constructor(private router: Router, private storageService: StorageService) { }

  navigateToProjects() {
    this.storageService.lastProject ? 
    this.router.navigate(['/projects', this.storageService.lastProject.path]) :
    this.router.navigate(['/projects']);
  }
}
