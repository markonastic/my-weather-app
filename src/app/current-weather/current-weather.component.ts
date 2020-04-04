import { Component, OnInit } from '@angular/core';
import { CurrentWeather } from './current-weather';
import { CurrentWeatherModel } from '../models/current-weather.model';
import { WeatherModel } from './../models/weather.model';
import { IUnit } from '../navbar/unit';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {

  public currentWeather: CurrentWeather = null;
  public unit: IUnit = null;
  public show: boolean = null;
  public date: number = null;

  constructor(private currentWeatherModel: CurrentWeatherModel, private weatherModel: WeatherModel) {}

  ngOnInit(): void {
    const { unitEvent } = this.weatherModel;

    unitEvent.subscribe((unit: IUnit) => this.unit = unit);

    const { currentWeatherEvent } = this.currentWeatherModel;

    currentWeatherEvent.subscribe((weather: CurrentWeather) => {
      this.currentWeather = weather;
    });
  }
}
