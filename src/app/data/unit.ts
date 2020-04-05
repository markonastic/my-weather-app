export class Unit {
  public name: string;
  public unitSign: string;
  public wind: string;

  constructor(unit: IUnit) {
    this.name = unit.name;
    this.unitSign = unit.unitSign;
    this.wind = unit.wind;
  }
}

export interface IUnit {
  name: string;
  unitSign: string;
  wind: string;
}
