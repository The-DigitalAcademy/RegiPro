import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ChooseComponent } from './pages/choose/choose.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { CipsNumComponent } from './pages/cips-num/cips-num.component';
import { QuestionnairesComponent } from './pages/questionnaires/questionnaires.component';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { BusinessPlanComponent } from './pages/business-plan/business-plan.component';
import { BusinessProductComponent } from './pages/business-product/business-product.component';
import { AllSetComponent } from './pages/all-set/all-set.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RegenerateComponent } from './pages/regenerate/regenerate.component';
import { StepsComponent } from './pages/steps/steps.component';
import { GenerateBusinessPlanComponent } from './pages/generate-business-plan/generate-business-plan.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'choose', component: ChooseComponent },
  { path: 'about', component: AboutComponent },
  { path: 'onboarding', component: OnboardingComponent, canActivate: [AuthGuard] },
  { path: 'business-plan', component: BusinessPlanComponent },
  { path: 'business-pro', component: BusinessProductComponent },
  { path: 'cipcnum', component: CipsNumComponent },
  { path: 'questions', component: QuestionnairesComponent, canActivate: [AuthGuard] },
  {path: 'all-set', component: AllSetComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'regenerate/:bId', component:RegenerateComponent},
  {path: 'steps', component:StepsComponent}
  {path: 'generate', component: GenerateBusinessPlanComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
