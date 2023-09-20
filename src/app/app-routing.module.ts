import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './pages/chart/chart.component';
import { MainComponent } from './pages/main/main.component';
import { PagesComponent } from './pages/pages.component';
import { PagesModule } from './pages/pages.module';

const routes: Routes = [

  { path: '', component: PagesComponent, loadChildren: () => PagesModule }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
