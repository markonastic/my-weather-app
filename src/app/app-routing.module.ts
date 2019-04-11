import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: CurrentWeatherComponent },
  { path: 'weather-forecast', component: WeatherForecastComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
