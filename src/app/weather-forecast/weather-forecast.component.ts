import { WeatherModel } from './../models/weather.model';
import { Component, OnInit } from '@angular/core';
import { WeatherForecast } from './weather-forecast';
import { IUnit } from '../navbar/unit';
import { WeatherForecastModel } from '../models/weather-forecast.model';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {

  public weatherForecast: WeatherForecast = null;
  public unit: IUnit = null;

  constructor(private weatherForecastModel: WeatherForecastModel, private weatherModel: WeatherModel) {}

  ngOnInit(): void {
    const { unitEvent } = this.weatherModel;

    unitEvent.subscribe((unit: IUnit) => this.unit = unit);

    const { weatherForecastEvent } = this.weatherForecastModel;

    weatherForecastEvent.subscribe((weatherForecast: WeatherForecast) => {
      this.weatherForecast = weatherForecast;
    });
  }
}
