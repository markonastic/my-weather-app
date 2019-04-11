import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private any: any;
  private unitSource = new BehaviorSubject(this.any);
  unit = this.unitSource.asObservable();
  private citySource = new BehaviorSubject(this.any);
  city = this.citySource.asObservable();

  constructor(private http: HttpClient) { }

  getUnits() {
    return this.http
      .get('assets/json/units.json');
  }

  // getCities() {
  //   return this.http.get('assets/json/citylist.min.json');
  // }

  getIcon(id) {
    return this.http.get('https://openweathermap.org/img/w/' + id + '.png');
  }

  getCurrentWeatherByLocation(lat: string, lon: string) {
    return this.http
    .get('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=b71d357185e75eae5f2e52d7fba9a58a');
  }

  getCurrentWeather(id: number, unit: string) {
    return this.http
      .get('https://api.openweathermap.org/data/2.5/weather?id=' + id + '&units=' + unit + '&APPID=b71d357185e75eae5f2e52d7fba9a58a');
  }

  getWeatherForecast(id: number, unit: string) {
    return this.http
      .get('https://api.openweathermap.org/data/2.5/forecast?id=' + id + '&units=' + unit + '&APPID=b71d357185e75eae5f2e52d7fba9a58a');
  }

  changeUnit(unit) {
    this.unitSource.next(unit);
  }

  changeCity(city) {
    this.citySource.next(city);
  }
}
