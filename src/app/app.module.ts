import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { ApiService } from './services/api.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { CreateComponent } from './articles/create/create.component';
import { UpdateComponent } from './articles/update/update.component';
import { InfoComponent } from './info/info.component';
import { RegisterComponent } from './user/register/register/register.component';
import { LoginComponent } from './user/login/login/login.component';
import { UserService } from './services/user.service';
import { ArticleService } from './services/article.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { ArticlesComponent } from './articles/articles/articles.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    HeaderComponent,
    FooterComponent,
    CreateComponent,
    UpdateComponent,
    InfoComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    ArticlesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule    
  ],
  providers: [ ApiService, UserService, ArticleService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
