import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TabularComponent} from "./pages/tabular/tabular.component";
import {ChartsComponent} from "./pages/charts/charts.component";
import {MainComponent} from "./pages/main/main.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'tabular',
    component: TabularComponent
  },
  {
    path: 'charts',
    component: ChartsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
