import { Injectable, EventEmitter } from '@angular/core';
import { DataService } from './../services/data/data.service';
import { City } from '../data/city';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityModel {

  public citiesEvent: EventEmitter<City[]> = new EventEmitter();
  public searchCityEvent: EventEmitter<string> = new EventEmitter();
  public searchCitiesEvent: EventEmitter<City[]> = new EventEmitter();
  public currentCityEvent: ReplaySubject<City> = new ReplaySubject(1);
  public geoLocationEvent: EventEmitter<Coordinates> = new EventEmitter();
  public cities: City[] = null;
  public defaultCity: City = new City({
    id: 5128638,
    name: 'New York',
    country: 'US'
  });

  constructor(private dataService: DataService) {
    this.citiesEvent.subscribe((cities: City[]) => this.cities = cities);
    this.searchCityEvent.subscribe((text: string) => this.search(text));
    this.getGeolocation();
    this.getCities();
  }

  private getGeolocation(): void {
    navigator.permissions.query({name: 'geolocation'})
                         .then((result: PermissionStatus) => {
                          if (result.state === 'granted') {
                            this.getCurrentPosition();
                          } else {
                            this.currentCityEvent.next(this.defaultCity);
                          }
                         });
  }

  public getCities(): void {
    this.dataService.getCities().subscribe((cities: City[]) => {
      this.citiesEvent.emit(cities);
    });
  }

  private getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      this.geoLocationEvent.next(position.coords);
    });
  }

  public search(searchText: string): void {

    if (!searchText) {
      this.searchCitiesEvent.emit(null);
      return;
    }

    const searchCities: City[] = [];

    this.cities.filter((city: City) => {

      if (searchCities.length === 20) {
        return false;
      }

      const i = city.name.toLowerCase().indexOf(searchText.toLowerCase());

      if (i === 0) {
        searchCities.push(city);
      }
    });

    this.searchCitiesEvent.emit(searchCities);
  }
}
