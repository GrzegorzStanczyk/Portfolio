import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainComponent } from './main/main.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { PROJECTS } from "@app/shared";

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainComponent, data: { state: 'home' } },
  { path: 'projects', redirectTo: `projects/${PROJECTS[0].path}`, data: { state: 'projects' }, pathMatch: 'full' },
  { path: 'projects/:id', component: ProjectsComponent, data: { state: 'projects' }, pathMatch: 'full' },
  { path: 'contact', component: ContactComponent, data: { state: 'contact' } },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: true
    }),
    BrowserAnimationsModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
