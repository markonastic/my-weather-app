import { Injectable} from '@angular/core';
import { WeatherService } from '../services/weather/weather.service';
import { CityModel } from './city.model';
import { CurrentWeather, ICurrentWeather } from '../data/current-weather';
import { City } from '../data/city';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherModel {

  public currentWeatherEvent: ReplaySubject<CurrentWeather> = new ReplaySubject(1);

  constructor(private weatherService: WeatherService,
              private cityModel: CityModel
              ) {
    const { geoLocationEvent, currentCityEvent } = this.cityModel;

    geoLocationEvent.subscribe((coords: Coordinates) => {
      this.getCurrentWeatherByLocation(coords);
    });

    currentCityEvent.subscribe((city: City) => {
      this.getCurrentWeather(city);
    });
  }

  public getCurrentWeatherByLocation(coords: Coordinates): void {
    this.weatherService.getCurrentWeatherByLocation(coords.latitude, coords.longitude)
                       .subscribe((currentWeather: ICurrentWeather) => {
                         const tempWeather: CurrentWeather = new CurrentWeather(currentWeather);
                         this.currentWeatherEvent.next(tempWeather);
                         this.cityModel.currentCityEvent.next(tempWeather.city);
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
