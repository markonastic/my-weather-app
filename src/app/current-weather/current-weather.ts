import { City } from './../navbar/city';

export class CurrentWeather {
  public description: string;
  public icon: string;
  public tempC: number;
  public tempK: number;
  public tempF: number;
  public pressure: number;
  public humidity: number;
  public windSpeedMs: number;
  public windSpeedMph: number;
  public windDegree: number;
  public clouds: number;
  public date: number;
  public sunrise: number;
  public sunset: number;
  public city: City;

  constructor(currentWeather: ICurrentWeather) {
    const { weather, main, wind, clouds, sys, timezone, name, id } = currentWeather;

    this.description = weather[0].description;
    this.icon = weather[0].icon;
    this.tempC = main.temp;
    this.tempK = main.temp + 273.15;
    this.tempF = main.temp * 9 / 5 + 32;
    this.pressure = main.pressure;
    this.humidity = main.humidity;
    this.windSpeedMs = wind.speed;
    this.windSpeedMph = wind.speed * 2.23;
    this.windDegree = wind.deg;
    this.clouds = clouds.all;
    this.date = timezone * 1000;
    this.sunrise = sys.sunrise * 1000;
    this.sunset = sys.sunset * 1000;
    this.city = new City({
                          name,
                          id,
                          country: sys.country
                        });
  }
}

export interface ICurrentWeather {
  weather: ICurrentWeatherWeather[];
  main: ICurrentWeatherMain;
  wind: ICurrentWeatherWind;
  clouds: ICurrentWeatherClouds;
  dt: number; // internal parameter, not needed
  timezone: number;
  sys: ICurrentWeatherSys;
  id: number;
  name: string;
}

export interface ICurrentWeatherWeather {
  description: string;
  icon: string;
}

export interface ICurrentWeatherMain {
  temp: number;
  pressure: number;
  humidity: number;
}

export interface ICurrentWeatherWind {
  speed: number;
  deg: number;
}

export interface ICurrentWeatherClouds {
  all: number;
}

export interface ICurrentWeatherSys {
  country: string;
  sunrise: number;
  sunset: number;
}
