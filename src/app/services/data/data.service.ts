import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUnit } from '../../data/unit';
import { ICity } from '../../data/city';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getCities(): Observable<ICity[]> {
    return this.http.get('assets/json/citylist.min.json')
                    .pipe(map((cities: ICity[]) => cities));
  }

  public getUnits(): Observable<IUnit[]> {
    return this.http.get('assets/json/units.json')
                    .pipe(map((unit: IUnit[]) => unit));
  }
}
