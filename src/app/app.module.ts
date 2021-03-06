import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavigationComponent } from './navigation/navigation.component';
import { InstructionModalComponent } from './instruction-modal/instruction-modal.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { LoaderComponent } from './loader/loader.component';
import { SuccessMessageComponent } from './success-message/success-message.component';
import { ErrorMessageComponent } from './error-message/error-message.component';

import { ParticlesDirective } from './shared/directives/particles.directive';
import { RippleDirective } from './shared/directives/ripple.directive';

import { reducers } from './reducers';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environemnt

import {
  ResizeService,
  StateService,
  StorageService,
  NavigateService,
  SendMessageService } from '@app/shared';

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
    RippleDirective,
    InstructionModalComponent,
    ContactFormComponent,
    LoaderComponent,
    SuccessMessageComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'universal-portfolio'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  providers: [ResizeService,
    StorageService,
    NavigateService,
    StateService,
    SendMessageService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
