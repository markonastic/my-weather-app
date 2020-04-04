import { Injectable, EventEmitter } from '@angular/core';
import { IUnit, Unit } from '../navbar/unit';
import { City } from '../navbar/city';
import { WeatherService } from './../services/weather.service';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherModel {

  public cityEvent: ReplaySubject<City> = new ReplaySubject(1);
  public citiesEvent: EventEmitter<City[]> = new EventEmitter();
  public unitEvent: ReplaySubject<Unit> = new ReplaySubject(1);
  public unitsEvent: EventEmitter<Unit[]> = new EventEmitter();
  public geoLocationEvent: ReplaySubject<Coordinates> = new ReplaySubject(1);
  public defaultCity: City = new City({
    id: 5128638,
    name: 'New York',
    country: 'US'
  });

  constructor(private weatherService: WeatherService) {
    this.getGeolocation();
    this.getUnits();
    this.getCities();
  }

  public getUnits(): void {
    this.weatherService.getUnits().subscribe((units: IUnit[]) => {
      const tempUnits = [];
      units.forEach((unit: IUnit) => {
        tempUnits.push(new Unit(unit));
      });
      this.unitEvent.next(tempUnits[0]);
      this.unitsEvent.emit(tempUnits);
    });
  }

  public getCities(): void {
    this.weatherService.getCities().subscribe((cities: City[]) => {
      this.citiesEvent.emit(cities);
    });
  }

  private getGeolocation(): void {
    navigator.permissions.query({name: 'geolocation'})
                         .then((result: PermissionStatus) => {
                          if (result.state === 'granted') {
                            this.getCurrentPosition();
                          } else {
                            this.cityEvent.next(this.defaultCity);
                          }
                         });
  }

  private getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      this.geoLocationEvent.next(position.coords);
    });
  }
}
