import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CosasPage } from '../cosas/cosas';
import { GaleriaPage } from '../galeria/galeria';
import { MovimientoPage } from '../movimiento/movimiento';
/**
 * Generated class for the Menu2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu2',
  templateUrl: 'menu2.html',
})
export class Menu2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad Menu2Page');
  }

  SubirImagenes(){
    this.navCtrl.push(CosasPage);
  }

  Galeria(){
    this.navCtrl.push(GaleriaPage);
  }

  Movimiento(){
    this.navCtrl.push(MovimientoPage);
  }

}
