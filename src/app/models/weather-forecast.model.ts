import { WeatherModel } from './weather.model';
import { WeatherForecast, IWeatherForecast } from './../weather-forecast/weather-forecast';
import { Injectable } from '@angular/core';
import { City } from '../navbar/city';
import { WeatherService } from './../services/weather.service';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastModel {

  public weatherForecastEvent: ReplaySubject<WeatherForecast> = new ReplaySubject(1);

  constructor(private weatherService: WeatherService, private weatherModel: WeatherModel) {
    const { geoLocationEvent, cityEvent } = this.weatherModel;

    geoLocationEvent.subscribe((coords: Coordinates) => {
      this.getWeatherForecastByLocation(coords);
    });

    cityEvent.subscribe((city: City) => {
      this.getWeatherForecast(city);
    });
  }

  public getWeatherForecastByLocation(coords: Coordinates): void {
    this.weatherService.getWeatherForecastByLocation(coords.latitude, coords.longitude)
                       .subscribe((weatherForecast: IWeatherForecast) => {
                         const tempForecast: WeatherForecast = new WeatherForecast(weatherForecast);
                         this.weatherForecastEvent.next(tempForecast);
                         this.weatherModel.cityEvent.next(tempForecast.city);
                       });
  }

  public getWeatherForecast(city: City): void {
    this.weatherService.getWeatherForecast(city.id)
                       .subscribe((weatherForecast: IWeatherForecast) => {
                         const tempForecast: WeatherForecast = new WeatherForecast(weatherForecast);
                         this.weatherForecastEvent.next(tempForecast);
                       });
  }
}
