import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Menu2Page } from '../menu2/menu2';
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MenuPage');
  }

  CosasLindas(){
    localStorage.setItem("queCosa", 'L');
    this.navCtrl.push(Menu2Page);
  }

  CosasFeas(){
    localStorage.setItem("queCosa", 'F');
    this.navCtrl.push(Menu2Page);
  }

}
