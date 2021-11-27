import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TabularComponent} from "./pages/tabular/tabular.component";
import {ChartsComponent} from "./pages/charts/charts.component";
import {MainComponent} from "./pages/main/main.component";
import {ChernoffComponent} from "./pages/chernoff/chernoff/chernoff.component";

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
  },
  {
    path: 'faces',
    component: ChernoffComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
