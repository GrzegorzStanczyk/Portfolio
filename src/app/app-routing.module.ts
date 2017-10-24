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
  { path: 'projects', component: ProjectsComponent, data: { state: 'projects', project: PROJECTS[0] } },
  { path: 'contact', component: ContactComponent, data: { state: 'contact' } },
  { path: '**', component: NotFoundComponent }
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
