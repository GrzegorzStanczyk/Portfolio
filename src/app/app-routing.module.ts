import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainComponent } from './main/main.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent, data: { state: 'main' } },
  { path: 'projects', component: ProjectsComponent, data: { state: 'projects' } },
  { path: 'contact', component: ContactComponent, data: { state: 'contact' } },
  { path: '**', component: MainComponent }
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
