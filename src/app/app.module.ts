import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProjectsComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'universal-portfolio'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
