import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CosasPage } from './cosas';

@NgModule({
  declarations: [
    CosasPage,
  ],
  imports: [
    IonicPageModule.forChild(CosasPage),
  ],
})
export class CosasPageModule {}
