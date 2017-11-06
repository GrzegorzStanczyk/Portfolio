import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavigationComponent } from './navigation/navigation.component';

import { ParticlesDirective } from './shared/directives/particles.directive';
import { RippleDirective } from './shared/directives/ripple.directive';

import { ResizeService } from './shared/services/resize.service';
import { StorageService } from './shared/services/storage.service';
import { NavigateService } from './shared/services/navigate.service';

import 'hammerjs';
import 'hammer-timejs';

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      'swipe': {direction: Hammer.DIRECTION_ALL}
  };
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProjectsComponent,
    ContactComponent,
    NotFoundComponent,
    NavigationComponent,
    ParticlesDirective,
    RippleDirective
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'universal-portfolio'}),
    AppRoutingModule
  ],
  providers: [ResizeService,
    StorageService,
    NavigateService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
