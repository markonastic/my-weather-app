import { WeatherService } from '../services/weather.service';
import { Component, OnInit } from '@angular/core';
import citiesJson from '../../assets/json/citylist.json';
import { Config } from 'protractor';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cities;
  units;
  unitIndex = 0;
  searchText = '';
  placeholder = '';
  searchCities = [];
  hide = true;
  showArrow: boolean;
  unitShow = true;
  width: number;
  location;
  city = {name: '', id: 0, country: ''};

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.cities = citiesJson;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords;
        this.weatherService
          .getCurrentWeatherByLocation(this.location.latitude, this.location.longitude)
            .subscribe((response: Config) => {
              this.city.name = response.name;
              this.city.id = response.id;
              this.city.country = response.sys.country;
              this.weatherService.changeCity(this.city);
              this.searchText = this.city.name + ', ' + this.city.country;
              this.placeholder = this.searchText;
            });
      });
    }
    // this.weatherService.getCities().subscribe((response: Config) => {
    //   this.cities = response;
    //   // this.weatherService.changeCity(this.cities[0]);
    //   // this.searchText = this.cities[0].name + ', ' + this.cities[0].country;
    //   // this.placeholder = this.searchText;
    // });

    this.weatherService.getUnits().subscribe(response => {
      this.units = response;
      this.weatherService.changeUnit(this.units[0]);
    });
  }

  unitChanged(i) {
    this.unitIndex = i;
    if (this.units) {
      this.weatherService.changeUnit(this.units[i]);
    }
  }

  cityChanged(i) {
    if (this.searchCities) {
      this.weatherService.changeCity(this.searchCities[i]);
    }
    this.searchText = this.searchCities[i].name + ', ' + this.searchCities[i].country;
    this.placeholder = this.searchText;
    this.searchCities = [];
    this.hide = true;
  }

  search() {
    const this1 = this;
    this.searchCities = [];
    this.cities.filter(function(city) {
      const i = city.name.toLowerCase().indexOf(this1.searchText.toLowerCase());
      if (
        i === 0 &&
        this1.searchText !== '' &&
        this1.searchCities.length < 20
      ) {
        this1.searchCities.push(city);
        this1.hide = false;
      }
      if (this1.searchCities.length === 20) {
        return;
      }
    });
    if (this.searchText === '') {
      this.hide = true;
    }
    if (this.searchCities.length > 4) {
      this.showArrow = true;
    } else {
      this.showArrow = false;
    }
  }

  inputClick() {
    this.searchCities = [];
    this.searchText = '';
    this.hide = true;
  }

  showUnit() {
    this.unitShow = !this.unitShow;
  }
}
