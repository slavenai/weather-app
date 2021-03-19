import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    // 'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Origin': 'https://api.apixu.com'
  }

  getWeather(location) {
       return this.http.get(
      'http://api.weatherstack.com/current?access_key=bd99791ff3acfce034c2e265680b8288&query=' + location
    );
  }
}

