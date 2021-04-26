import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  public weatherSearchForm: FormGroup;
  public weatherData: any;
  public location: string;

  constructor(private formBuilder: FormBuilder, public apiService: ApiService, private articleService: ArticleService) {}

  ngOnInit(): void {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });
  }

  sendData(formValues) {
    this.apiService
      .getWeather(formValues.location)
       .subscribe(data => {
         this.weatherData = data
         console.log(this.weatherData);
          // this.location = this.apiService.showDestination(this.weatherData.location.name, this.weatherData?.location.country); 
          // this.apiService.location = this.location;
          this.location = this.apiService.location
        })         
  }

}
