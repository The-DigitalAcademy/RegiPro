import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './about/about.component';
import { LandingComponent } from './landing/landing.component';

import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';


const routes: Routes = [
  {path: '', redirectTo: 'landing', pathMatch:'full'},
  { path: 'signUp', component: SignUpComponent },
  { path: 'signIn', component: SignInComponent },
  // {path: 'home', component: HomeComponent,canActivate:[AuthGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'landing', component: LandingComponent}
  // {path: 'profile', component: ProfileComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
