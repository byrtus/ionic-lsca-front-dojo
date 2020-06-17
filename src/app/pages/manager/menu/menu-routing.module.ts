import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
import {AuthGuard} from "../../../providers/auth.guard";

const routes: Routes = [
  {
    path: '',
    component : MenuPage,
    children: [
      {
        path: 'stat',
        loadChildren: () => import('../stat/stat.module').then(m => m.StatPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
