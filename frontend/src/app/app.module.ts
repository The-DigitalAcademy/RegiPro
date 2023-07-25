import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';

import { ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';


import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ChooseComponent } from './pages/choose/choose.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AboutComponent } from './pages/about/about.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';


@NgModule({

  declarations: [
    AppComponent,
    LandingPageComponent,

    SignInComponent,
    SignUpComponent,
    HomeComponent,
     ProfileComponent,
     ChooseComponent,
     LandingPageComponent,
     AboutComponent,
     OnboardingComponent,

  ],
imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgToastModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
