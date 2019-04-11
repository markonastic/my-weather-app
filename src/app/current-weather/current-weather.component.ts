import { WeatherService } from '../services/weather.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {

  weather = null;
  unit = null;
  city = null;
  show: boolean;
  date = new Date();

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {

    this.weatherService.unit.subscribe(response => {
      this.unit = response;
      this.show = false;
      this.weatherService.city.subscribe(response1 => {
        this.city = response1;
        if (this.city && this.unit) {
          this.weatherService.getCurrentWeather(this.city.id, this.unit.unit).subscribe(response2 => {
            this.weather = response2;
            this.show = true;
          });
        }
      });
    });
  }
}
