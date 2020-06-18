import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministratePage } from './administrate.page';

const routes: Routes = [
  {
    path: '',
    component: AdministratePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratePageRoutingModule {}
