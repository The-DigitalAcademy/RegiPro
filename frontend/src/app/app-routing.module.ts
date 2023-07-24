import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './about/about.component';
import { LandingComponent } from './landing/landing.component';


import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  {path: '', redirectTo: 'landing', pathMatch:'full'},
  { path: 'signUp', component: SignUpComponent },
  { path: 'signIn', component: SignInComponent },
  {path: 'home', component: HomeComponent},
  {path: 'landing', component: LandingComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
