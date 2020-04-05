import { Component, OnInit } from '@angular/core';
import { WeatherForecast } from '../../data/weather-forecast';
import { WeatherForecastModel } from '../../models/weather-forecast.model';
import { UnitModel } from '../../models/unit.model';
import { IUnit } from '../../data/unit';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {

  public weatherForecast: WeatherForecast = null;
  public unit: IUnit = null;

  constructor(private weatherForecastModel: WeatherForecastModel,
              private unitModel: UnitModel
             ) {}

  ngOnInit(): void {
    const { currentUnitEvent } = this.unitModel;

    currentUnitEvent.subscribe((unit: IUnit) => this.unit = unit);

    const { weatherForecastEvent } = this.weatherForecastModel;

    weatherForecastEvent.subscribe((weatherForecast: WeatherForecast) => {
      this.weatherForecast = weatherForecast;
    });
  }
}
