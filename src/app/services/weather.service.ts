import { ICurrentWeather } from './../current-weather/current-weather';
import { IUnit } from './../navbar/unit';
import { ICity } from './../navbar/city';
import { IWeatherForecast } from './../weather-forecast/weather-forecast';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private _url = 'https://api.openweathermap.org/data/2.5/';
  private unitAppID = '&units=metric&appID=b71d357185e75eae5f2e52d7fba9a58a';

  constructor(private http: HttpClient) { }

  public getCities(): Observable<ICity[]> {
    return this.http.get('assets/json/citylist.min.json')
                    .pipe(map((cities: ICity[]) => cities));
  }

  public getUnits(): Observable<IUnit[]> {
    return this.http.get('assets/json/units.json')
                    .pipe(map((unit: IUnit[]) => unit));
  }

  public getCurrentWeatherByLocation(lat: number, lon: number): Observable<ICurrentWeather> {
    return this.http.get(this._url + 'weather?lat=' + lat + '&lon=' + lon + this.unitAppID)
                    .pipe(map((currentWeather: ICurrentWeather) => currentWeather));
  }

  public getWeatherForecastByLocation(lat: number, lon: number): Observable<IWeatherForecast> {
    return this.http.get(this._url + 'forecast?lat=' + lat + '&lon=' + lon + this.unitAppID)
                    .pipe(map((weatherForecast: IWeatherForecast) => weatherForecast));
  }

  public getCurrentWeather(cityId: number): Observable<ICurrentWeather> {
    return this.http.get(this._url + 'weather?id=' + cityId + this.unitAppID)
                    .pipe(map((currentWeather: ICurrentWeather) => currentWeather));
  }

  public getWeatherForecast(cityId: number): Observable<IWeatherForecast> {
    return this.http.get(this._url + 'forecast?id=' + cityId + this.unitAppID)
                    .pipe(map((weatherForecast: IWeatherForecast) => weatherForecast));
  }
}
