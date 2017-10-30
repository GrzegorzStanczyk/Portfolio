import { Injectable } from '@angular/core';
import { Project } from '@app/shared';

@Injectable()
export class StorageService {
  lastProject: Project = null;
  projectCounter: number = null;
  constructor() { }

}
