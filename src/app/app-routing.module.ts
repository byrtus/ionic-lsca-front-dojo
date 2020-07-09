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
    path: 'card-detail/:companyId',
    loadChildren: () => import('./pages/customer/card-detail/card-detail.module').then(m => m.CardDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/customer/menu/menu.module').then( m => m.MenuPageModule)
  },

    // MANAGER COMPONENTS

  {
    path: 'menu',
    loadChildren: () => import('./pages/manager/menu/menu.module').then(m => m.MenuPageModule)
  },

    // ADMIN COMPONENTS

  {
    path: 'menu',
    loadChildren: () => import('./pages/admin/menu/menu.module').then( m => m.MenuPageModule)
  },

  // Wild Card Protection

  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
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
