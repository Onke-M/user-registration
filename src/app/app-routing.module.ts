import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { OtpPageComponent } from './otp/otp-page/otp-page.component';
import { RegisterPageComponent } from './register/register-page/register-page.component';
import { DashboardPageComponent } from './dashboard/dashboard-page/dashboard-page.component';

const routes: Routes = [
  { path: '',component: LoginPageComponent},
  { path: 'login',component: LoginPageComponent},
  { path: 'register', component: RegisterPageComponent},
  { path: 'dashboard', component: DashboardPageComponent},
  { path: 'otp', component: OtpPageComponent},
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
