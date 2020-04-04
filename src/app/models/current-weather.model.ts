import { City } from './../navbar/city';
import { WeatherModel } from './weather.model';
import { CurrentWeather, ICurrentWeather } from './../current-weather/current-weather';
import { Injectable} from '@angular/core';
import { WeatherService } from './../services/weather.service';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherModel {

  public currentWeatherEvent: ReplaySubject<CurrentWeather> = new ReplaySubject(1);

  constructor(private weatherService: WeatherService, private weatherModel: WeatherModel) {
    const { geoLocationEvent, cityEvent } = this.weatherModel;

    geoLocationEvent.subscribe((coords: Coordinates) => {
      this.getCurrentWeatherByLocation(coords);
    });

    cityEvent.subscribe((city: City) => {
      this.getCurrentWeather(city);
    });
  }

  public getCurrentWeatherByLocation(coords: Coordinates): void {
    this.weatherService.getCurrentWeatherByLocation(coords.latitude, coords.longitude)
                       .subscribe((currentWeather: ICurrentWeather) => {
                         const tempWeather: CurrentWeather = new CurrentWeather(currentWeather);
                         this.currentWeatherEvent.next(tempWeather);
                         this.weatherModel.cityEvent.next(tempWeather.city);
                       });
  }

  public getCurrentWeather(city: City): void {
    this.weatherService.getCurrentWeather(city.id)
                       .subscribe((currentWeather: ICurrentWeather) => {
                        const tempWeather: CurrentWeather = new CurrentWeather(currentWeather);
                        this.currentWeatherEvent.next(tempWeather);
                       });
  }
}
