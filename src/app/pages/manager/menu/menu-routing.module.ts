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
      },
      {
        path: 'stamp-card',
        loadChildren: () => import('../stamp-card/stamp-card.module').then(m => m.StampCardPageModule)
      },
      {
        path: 'Qr',
        loadChildren: () => import('../qr/qr.module').then(m => m.QrPageModule)
      },
      {
        path: 'Qr',
        loadChildren: () => import('../qr/qr.module').then(m => m.QrPageModule)
      },{
        path: 'account',
        loadChildren: () => import('../account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: '',
        redirectTo: '/menu/stat',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
