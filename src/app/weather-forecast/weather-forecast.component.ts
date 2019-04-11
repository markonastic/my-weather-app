import { WeatherService } from '../services/weather.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {

  forDays = null;
  unit = null;
  city = null;
  daysArray = [];
  location = {};

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.unit.subscribe(response => {
      this.unit = response;
      this.weatherService.city.subscribe(response1 => {
        this.city = response1;
        if (this.city) {
          this.weatherService
            .getWeatherForecast(this.city.id, this.unit.unit)
              .subscribe(response2 => {
                this.forDays = response2;
                for (const listEl of this.forDays.list) {
                  if (this.daysArray.indexOf(listEl.dt_txt.substr(0, 10)) < 0) {
                    this.daysArray.push(listEl.dt_txt.substr(0, 10));
                  }
                }
              });
        }
      });
    });
  }
}
