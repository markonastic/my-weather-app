import { UnitModel } from '../../models/unit.model';
import { Component, OnInit } from '@angular/core';
import { CurrentWeather } from '../../data/current-weather';
import { CurrentWeatherModel } from '../../models/current-weather.model';
import { IUnit } from '../../data/unit';

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

  constructor(private currentWeatherModel: CurrentWeatherModel,
              private unitModel: UnitModel
             ) {}

  ngOnInit(): void {
    const { currentUnitEvent } = this.unitModel;

    currentUnitEvent.subscribe((unit: IUnit) => this.unit = unit);

    const { currentWeatherEvent } = this.currentWeatherModel;

    currentWeatherEvent.subscribe((currentWeather: CurrentWeather) => {
      this.currentWeather = currentWeather;
    });
  }
}
