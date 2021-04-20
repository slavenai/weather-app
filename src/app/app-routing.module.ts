import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login/login.component';
import { RegisterComponent } from './user/register/register/register.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
{
  path: '',
  pathMatch: 'full',
  component: WeatherComponent
},
{
  path: 'register',
  component: RegisterComponent
},
{
  path: 'login',
  component: LoginComponent
}
]


export const AppRoutingModule = RouterModule.forRoot(routes);
