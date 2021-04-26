import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './articles/create/create.component';
import { UpdateComponent } from './articles/update/update.component';
import { NotFoundComponent } from './not-found/not-found.component';
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
},
{
  path: 'create/night',
  component: CreateComponent,
  data: {type: 'night'}
},
{
  path: 'create/meal',
  component: CreateComponent,
  data: {type: 'meal'}
},
{
  path: 'create/explore',
  component: CreateComponent,
  data: {type: 'explore'}
},
{
  path: 'create/fun',
  component: CreateComponent,
  data: {type: 'fun'}
},
{
  path: 'update',
  component: UpdateComponent
},
{
  path: '**',
  component: NotFoundComponent
}
]


export const AppRoutingModule = RouterModule.forRoot(routes);
