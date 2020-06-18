import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'stats',
        loadChildren: () => import('../stat/stat.module').then(m => m.StatPageModule)
      },
      {
        path: 'administrate',
        loadChildren: () => import('../administrate/administrate.module').then(m => m.AdministratePageModule)
      },
      {
        path: 'view',
        loadChildren: () => import('../view/view.module').then(m => m.ViewPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: '',
        redirectTo: '/menu/stats',
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
