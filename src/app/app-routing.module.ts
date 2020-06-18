import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './providers/auth.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./pages/customer/tabs/tabs.module').then(m => m.TabsPageModule),
  //   canActivate: [AuthGuard]
  // },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/public/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/public/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'tabs/wallet/card-detail/:companyId',
    loadChildren: () => import('./pages/customer/card-detail/card-detail.module').then(m => m.CardDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/customer/menu/menu.module').then( m => m.MenuPageModule)
  },

    // MANAGER COMPONENTS

  {
    path: 'tabs',
    loadChildren: () => import('./pages/manager/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/manager/menu/menu.module').then(m => m.MenuPageModule)
  },

    // ADMIN COMPONENTS

  {
    path: 'stat',
    loadChildren: () => import('./pages/admin/stat/stat.module').then( m => m.StatPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/admin/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'administrate',
    loadChildren: () => import('./pages/admin/administrate/administrate.module').then( m => m.AdministratePageModule)
  },

  // Wild Card Protection

  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'view',
    loadChildren: () => import('./pages/admin/view/view.module').then( m => m.ViewPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {}
