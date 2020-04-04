import { Component, OnInit } from '@angular/core';
import { City } from '../navbar/city';
import { Unit } from '../navbar/unit';
import { WeatherModel } from '../models/weather.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public cities: City[] = null;
  public units: Unit[] = null;
  public unitIndex: number = 0;
  public searchText: string = null;
  public placeholder: string  = 'Enter city name';
  public searchCities: City[] = null;
  public hide: boolean = true;
  public showArrow: boolean = null;
  public unitShow: boolean = true;
  public width: number = null;
  public translate: string = null;

  constructor(private weatherModel: WeatherModel) {}

  public ngOnInit(): void {
    this.weatherModel.cityEvent.subscribe((city: City) => {
      this.setSearchText(city);
    });
    this.weatherModel.citiesEvent.subscribe((cities: City[]) => this.cities = cities);
    this.weatherModel.unitsEvent.subscribe((units: Unit[]) => this.units = units);
    this.onResize();
  }

  public unitChanged(i: number): void {
    this.weatherModel.unitEvent.next(this.units[i]);
    this.unitIndex = i;
  }

  public cityChanged(i: number): void {
    if (this.searchCities) {
      this.weatherModel.cityEvent.next(this.searchCities[i]);
    }
    this.setSearchText(this.searchCities[i]);
    this.searchCities = [];
    this.hide = true;
  }

  public search(): void {
    const self = this;
    this.searchCities = [];
    this.cities.filter((city: City) => {
      const i = city.name.toLowerCase().indexOf(self.searchText.toLowerCase());
      if (
        i === 0 &&
        self.searchText !== '' &&
        self.searchCities.length < 20
      ) {
        self.searchCities.push(city);
        self.hide = false;
      }
      if (self.searchCities.length === 20) {
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

  public setSearchText(city: City): void {
    this.searchText = city.name + ', ' + city.country;
    this.placeholder = this.searchText;
  }

  public inputClick(): void {
    this.searchCities = [];
    this.searchText = '';
    this.hide = true;
  }

  public showUnit(): void {
    this.unitShow = !this.unitShow;
  }

  public onResize(): void {
    if (window.innerWidth <= 550) {
      this.translate = 'translateY';
    } else {
      this.translate = 'translateX';
    }
  }
}
