import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ChooseComponent } from './pages/choose/choose.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { Quiz3Component } from './pages/quiz3/quiz3.component';
import { Quiz1Component } from './pages/quiz1/quiz1.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'choose', component: ChooseComponent},
  {path: 'onboarding', component: OnboardingComponent},
  {path: 'quiz1', component:Quiz1Component},
  {path: 'quiz3', component: Quiz3Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
