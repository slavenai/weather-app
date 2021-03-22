import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  public weatherSearchForm: FormGroup;
  public weatherData: any;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

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
      })
  }

  fahrenheitDegrees(celsiusDegrees) {
    if (celsiusDegrees == 0 || celsiusDegrees == undefined) {
      return;
    } else {
      return ((celsiusDegrees * 9 / 5) + 32);
    }
  }

  formatTemperature(celsiusDegrees) {
    let fahrenHeit = 0;
    if (celsiusDegrees == undefined) {
      return;
    } else {
      fahrenHeit = (celsiusDegrees * 9 / 5) + 32;

      return `${celsiusDegrees}°C | ${fahrenHeit}°F`
  }
  }

  showDestination(name, country) {
    if (name == '' || name == undefined || country == '' || country == undefined) {
      return;
    } else {
      return `${name}, ${country}`;
    }
  }

  formatDateTime(str: string) {
    const strArr = str.split(' ');
    const date = strArr[0];
    const time = strArr[1];

    const months = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December',
    }

    const dateSplit = date.split('-');
    const month = dateSplit[1];

    return `${dateSplit[2]} ${months[month]} ${dateSplit[0]}, ${time}`;

  }

}
