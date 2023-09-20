import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { PAGES_ROUTES } from './pages.routing.module';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartComponent } from './chart/chart.component';
import { DynamicChartComponent } from './chart/dynamic-chart/dynamic-chart.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MainComponent,
    PagesComponent,
    ChartComponent,
    DynamicChartComponent
  ],
  imports: [
    CommonModule,
    PAGES_ROUTES,
    NgSelectModule,
    HighchartsChartModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ]
})
export class PagesModule { }
