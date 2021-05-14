import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles/articles.component';
import { CreateComponent } from './articles/create/create.component';
import { UpdateComponent } from './articles/update/update.component';
import { AuthGuard } from './guards/auth.guard';
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
  component: RegisterComponent,
  canActivate: [AuthGuard],
  data: {
    isLogged: false
  }
},
{
  path: 'login',
  component: LoginComponent,
  canActivate: [AuthGuard],
  data: {
    isLogged: false
  }
},
{
  path: 'create/night',
  component: CreateComponent,  
  canActivate: [AuthGuard],
  data: 
  {type: 'night',
   isLogged: true}
},
{
  path: 'create/meal',
  component: CreateComponent,
  canActivate: [AuthGuard],
  data: 
  {type: 'meal',
  isLogged: true}
},
{
  path: 'create/explore',
  component: CreateComponent,
  canActivate: [AuthGuard],
  data: {type: 'explore',
  isLogged: true}
},
{
  path: 'create/fun',
  component: CreateComponent,
  canActivate: [AuthGuard],
  data: {type: 'fun',
  isLogged: true}
},
{
  path: 'update/:id',
  component: UpdateComponent,
  canActivate: [AuthGuard],
  data: {isLogged: true}
},
{
  path: 'articles/night',
  component: ArticlesComponent,
    canActivate: [AuthGuard],
  data: {type: 'night',
  isLogged: true}
},
{
  path: 'articles/meal',
  component: ArticlesComponent,
    canActivate: [AuthGuard],
  data: {type: 'meal',
  isLogged: true}
},
{
  path: 'articles/explore',
  component: ArticlesComponent,
    canActivate: [AuthGuard],
  data: {type: 'explore',
  isLogged: true}
},
{
  path: 'articles/fun',
  component: ArticlesComponent,
  canActivate: [AuthGuard],
  data: {type: 'fun',
  isLogged: true}
},
{
  path: '**',
  component: NotFoundComponent,
}
]


export const AppRoutingModule = RouterModule.forRoot(routes);
