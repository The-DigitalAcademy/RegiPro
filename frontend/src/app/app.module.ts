import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ChooseComponent } from './pages/choose/choose.component';
import { HomeComponent } from './pages/home/home.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { Quiz3Component } from './pages/quiz3/quiz3.component';
import { Quiz1Component } from './pages/quiz1/quiz1.component';
import { Quiz2Component } from './pages/quiz2/quiz2.component';
import { Quiz4Component } from './pages/quiz4/quiz4.component';
import { Quiz5Component } from './pages/quiz5/quiz5.component';
import { CipsNumComponent } from './pages/cips-num/cips-num.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LandingComponent,
    ChooseComponent,
    HomeComponent,
    OnboardingComponent,
    Quiz3Component,
    Quiz1Component,
    Quiz2Component,
    Quiz4Component,
    Quiz5Component,
    CipsNumComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
