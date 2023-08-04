import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ChooseComponent } from './pages/choose/choose.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { RegenerateComponent } from './pages/regenerate/regenerate.component';
import { StepsComponent } from './pages/steps/steps.component';
import { StepInfoComponent } from './pages/step-info/step-info.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'choose', component: ChooseComponent},
  {path: 'onboarding', component: OnboardingComponent},
  {path: 'regenerate', component: RegenerateComponent},
  {path: 'steps', component: StepsComponent},
  {path: 'step-info', component: StepInfoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
