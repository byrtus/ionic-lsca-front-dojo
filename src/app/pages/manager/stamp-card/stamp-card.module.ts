import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StampCardPageRoutingModule } from './stamp-card-routing.module';

import { StampCardPage } from './stamp-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StampCardPageRoutingModule
  ],
  declarations: [StampCardPage]
})
export class StampCardPageModule {}
