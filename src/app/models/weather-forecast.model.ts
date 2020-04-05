import { Injectable } from '@angular/core';
import { WeatherService } from '../services/weather/weather.service';
import { CityModel } from './city.model';
import { WeatherForecast, IWeatherForecast } from '../data/weather-forecast';
import { City } from '../data/city';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastModel {

  public weatherForecastEvent: ReplaySubject<WeatherForecast> = new ReplaySubject(1);

  constructor(private weatherService: WeatherService,
              private cityModel: CityModel
             ) {
    const { geoLocationEvent, currentCityEvent } = this.cityModel;

    geoLocationEvent.subscribe((coords: Coordinates) => {
      this.getWeatherForecastByLocation(coords);
    });

    currentCityEvent.subscribe((city: City) => {
      this.getWeatherForecast(city);
    });
  }

  public getWeatherForecastByLocation(coords: Coordinates): void {
    this.weatherService.getWeatherForecastByLocation(coords.latitude, coords.longitude)
                       .subscribe((weatherForecast: IWeatherForecast) => {
                         const tempForecast: WeatherForecast = new WeatherForecast(weatherForecast);
                         this.weatherForecastEvent.next(tempForecast);
                         this.cityModel.currentCityEvent.next(tempForecast.city);
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
