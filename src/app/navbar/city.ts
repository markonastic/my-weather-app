export class City {

  public name: string;
  public id: number;
  public country: string;

  constructor(city: ICity) {
    this.name = city.name;
    this.id = city.id;
    this.country = city.country;
  }
}

export interface ICity {
  name: string;
  id: number;
  country: string;
}
