import { Component, OnInit } from '@angular/core';
import { City } from '../../data/city';
import { Unit } from '../../data/unit';
import { CityModel } from '../../models/city.model';
import { UnitModel } from '../../models/unit.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public units: Unit[] = null;
  public unitIndex: number = 0;
  public searchText: string = null;
  public placeholder: string  = 'Enter city name';
  public searchCities: City[] = null;
  public unitShow: boolean = true;
  public translate: string = null;

  constructor(private unitModel: UnitModel,
              private cityModel: CityModel) {}

  public ngOnInit(): void {
    this.cityModel.searchCitiesEvent.subscribe((cities: City[]) => this.searchCities = cities);
    this.cityModel.currentCityEvent.subscribe((city: City) => this.setSearchText(city));
    this.unitModel.unitsEvent.subscribe((units: Unit[]) => this.units = units);
    this.onResize();
  }

  public unitChanged(i: number): void {
    this.unitModel.currentUnitEvent.next(this.units[i]);
    this.unitIndex = i;
  }

  public cityChanged(city: City): void {
    this.cityModel.currentCityEvent.next(city);
    this.cityModel.searchCitiesEvent.emit(null);
    this.searchCities = null;
  }

  public setSearchText(city: City): void {
    this.searchText = city.name + ', ' + city.country;
    this.placeholder = this.searchText;
  }

  public onResize(): void {
    if (window.innerWidth <= 550) {
      this.translate = 'translateY';
    } else {
      this.translate = 'translateX';
    }
  }
}
