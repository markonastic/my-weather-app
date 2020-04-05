import { Injectable, EventEmitter } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { IUnit, Unit } from '../data/unit';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitModel {

  public currentUnitEvent: ReplaySubject<Unit> = new ReplaySubject(1);
  public unitsEvent: EventEmitter<Unit[]> = new EventEmitter();

  constructor(private dataService: DataService) {
    this.getUnits();
  }

  public getUnits(): void {
    this.dataService.getUnits().subscribe((units: IUnit[]) => {
      const tempUnits = [];
      units.forEach((unit: IUnit) => {
        tempUnits.push(new Unit(unit));
      });
      this.currentUnitEvent.next(tempUnits[0]);
      this.unitsEvent.emit(tempUnits);
    });
  }
}
