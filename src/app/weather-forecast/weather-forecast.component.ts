import { WeatherService } from '../services/weather.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {
  forDays;
  unit;
  city;
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
              for (let i = 0; i < this.forDays.list.length; i++) {
                if (
                  this.daysArray.indexOf(
                    this.forDays.list[i].dt_txt.substr(0, 10)
                  ) < 0
                ) {
                  this.daysArray.push(
                    this.forDays.list[i].dt_txt.substr(0, 10)
                  );
                }
              }
            });
        }
      });
    });
  }
}
