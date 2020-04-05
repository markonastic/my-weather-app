import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
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
