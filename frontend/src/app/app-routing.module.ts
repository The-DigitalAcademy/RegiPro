import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { ChooseComponent } from './pages/choose/choose.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { HomeComponent } from './pages/home/home.component';

import { Quiz3Component } from './pages/quiz3/quiz3.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'landing', pathMatch:'full'},
  { path: 'signUp', component: SignUpComponent },
  { path: 'signIn', component: SignInComponent },
  {path: 'home', component: HomeComponent},
  {path: 'landing', component: LandingPageComponent},
  {path: 'choose', component: ChooseComponent},
  {path: 'about', component: AboutComponent},
  {path: 'boarding', component: OnboardingComponent},
  {path: 'quiz3', component: Quiz3Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
