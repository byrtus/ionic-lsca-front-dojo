import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministratePageRoutingModule } from './administrate-routing.module';

import { AdministratePage } from './administrate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministratePageRoutingModule
  ],
  declarations: [AdministratePage]
})
export class AdministratePageModule {}
