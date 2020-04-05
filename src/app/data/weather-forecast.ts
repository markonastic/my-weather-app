import { ICity, City } from './city';

export class ListMain {
  public tempC: number;
  public tempK: number;
  public tempF: number;
  public feelsLike: number;
  public minTemp: number;
  public maxTemp: number;
  public pressure: number;
  public seaLevel: number;
  public groundLevel: number;
  public humidity: number;
  public tempKf: number;

  constructor(listMain: IListMain) {
    const { temp, temp_min, temp_max, pressure, sea_level, grnd_level, humidity, temp_kf } = listMain;

    this.tempC = temp;
    this.tempK = temp + 273.15;
    this.tempF = temp * 9 / 5 + 32;
    this.minTemp = temp_min;
    this.maxTemp = temp_max;
    this.pressure = pressure;
    this.seaLevel = sea_level;
    this.groundLevel = grnd_level;
    this.humidity = humidity;
    this.tempKf = temp_kf;
  }
}

export interface IListMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export class List {
  public date: string;
  public shortDate: string;
  public weather: IListWeather;
  public dt: number;
  public main: ListMain;
  public clouds: IListClouds;
  public wind: IListWind;
  public sys: IListSys;

  constructor(list: IList) {
    this.date = list.dt_txt;
    this.shortDate = list.dt_txt.substr(0, 10);
    this.dt = list.dt;
    this.weather = list.weather[0];
    this.main = new ListMain(list.main);
    this.clouds = list.clouds;
    this.wind = list.wind;
    this.sys = list.sys;
  }
}

export interface IList {
  dt: number;
  main: IListMain;
  weather: IListWeather[];
  clouds: IListClouds;
  wind: IListWind;
  sys: IListSys;
  'dt_txt': string;
}

export class WeatherForecast {
  public hours: List[];
  public days: string[];
  public city: City;

  constructor(weatherForecast: IWeatherForecast) {
    const { list, city } = weatherForecast;
    this.city = new City(city);

    this.hours = [];
    this.days = [];

    list.forEach((hour: IList, index: number) => {
      const tempHour: List = new List(hour);
      this.hours.push(tempHour);

      const tempDate: string = tempHour.shortDate;
      if (this.days.indexOf(tempDate) < 0) {
        this.days.push(tempDate);
      }
    });
  }
}

export interface IWeatherForecast {
  list: IList[];
  city: ICity;
}

export interface IListWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IListClouds {
  all: number;
}

export interface IListWind {
  speed: number;
  deg: number;
}

export interface IListSys {
  pod: string;
}
