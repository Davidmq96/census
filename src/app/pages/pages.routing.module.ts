import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { MainComponent } from './main/main.component';



const pagesRoutes: Routes = [
    { path: 'home', component: MainComponent, data: { title: 'Main' } },
    { path: 'charts', component: ChartComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full', data: { title: 'Main' } }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
