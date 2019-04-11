import { WeatherService } from './services/weather.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WeatherForecastComponent,
    CurrentWeatherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
