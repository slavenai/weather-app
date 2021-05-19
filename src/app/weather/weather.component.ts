import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ArticleService } from '../services/article.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  public weatherSearchForm: FormGroup;
  public weatherData: any;
  public location: string;

  constructor(private formBuilder: FormBuilder, public apiService: ApiService, private userService: UserService) {}

  ngOnInit(): void {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });

  

    if (this.apiService.location && this.userService.currentUser.isLoggedIn == true) {
      this.apiService
      .getWeather(this.apiService.location)
       .subscribe(data => {
         this.weatherData = data
         this.location = this.apiService.showDestination(data.location.name, data.location.country);
        })
    }

  }

   get isLoggedIn() {
    return this.userService.currentUser.isLoggedIn;
  }


  sendData(formValues) {
    this.apiService
      .getWeather(formValues.location)
       .subscribe(data => {
         this.weatherData = data
          this.location = this.apiService.showDestination(data.location.name, data.location.country);
          this.apiService.location = this.location;
        })
     
  }

}
