import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
{
  path: '',
  pathMatch: 'full',
  component: WeatherComponent
}
]


export const AppRoutingModule = RouterModule.forRoot(routes);
