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
import { Quiz2Component } from './pages/quiz2/quiz2.component';
import { Quiz4Component } from './pages/quiz4/quiz4.component';
import { Quiz5Component } from './pages/quiz5/quiz5.component';
import { CipsNumComponent } from './pages/cips-num/cips-num.component';
import { QuestionnairesComponent } from './pages/questionnaires/questionnaires.component';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { BusinessPlanComponent } from './pages/business-plan/business-plan.component';
import { BusinessProductComponent } from './pages/business-product/business-product.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'choose', component: ChooseComponent },
  { path: 'about', component: AboutComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: 'business-plan', component: BusinessPlanComponent },
  { path: 'business-pro', component: BusinessProductComponent },
  { path: 'quiz1', component: Quiz1Component },
  { path: 'quiz2', component: Quiz2Component },
  { path: 'quiz3', component: Quiz3Component },
  { path: 'quiz4', component: Quiz4Component },
  { path: 'quiz5', component: Quiz5Component },
  { path: 'cipcnum', component: CipsNumComponent },
  { path: 'questions', component: QuestionnairesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
