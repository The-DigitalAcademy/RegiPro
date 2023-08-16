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
import { CipsNumComponent } from './pages/cips-num/cips-num.component';
import { QuestionnairesComponent } from './pages/questionnaires/questionnaires.component';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { BusinessPlanComponent } from './pages/business-plan/business-plan.component';
import { AllSetComponent } from './pages/all-set/all-set.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LandingComponent,
    ChooseComponent,
    HomeComponent,
    OnboardingComponent,
    CipsNumComponent,
    QuestionnairesComponent,
    AboutComponent,
    BusinessPlanComponent,
    AllSetComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [httpInterceptorProviders,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
