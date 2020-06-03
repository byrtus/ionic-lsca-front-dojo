import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./providers/auth.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/customer/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'promo',
    loadChildren: () => import('./pages/customer/promo/promo.module').then(m => m.PromoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'wallet',
    loadChildren: () => import('./pages/customer/wallet/wallet.module').then(m => m.WalletPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'qr',
    loadChildren: () => import('./pages/customer/qr/qr.module').then(m => m.QrPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/customer/map/map.module').then(m => m.MapPageModule),
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {}
