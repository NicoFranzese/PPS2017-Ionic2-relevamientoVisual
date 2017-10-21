import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private usuario;
  private password;
  private tipo;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

  Login(usuario: string, pass: string, tipo: string) {
    //console.log(this.usuario);

    if ((this.usuario == "") || (this.usuario == undefined) || (this.usuario == null) ||
      (this.usuario == "") || (this.usuario == undefined) || (this.usuario == null)) {
        this.presentToast("Debe ingresar usuario y contraseña"); 

    } else {
      localStorage.setItem("usuario", usuario);
      localStorage.setItem("password", pass);
      localStorage.setItem("tipoUsuario", tipo);

      this.navCtrl.push(MenuPage);
    }

  }

  HardcodearUsuario() {
    console.log("entró");
    console.log(this.tipo);
    if (this.tipo == 'Invitado') {
      this.usuario = 'Invitado';
      this.password = '22';
    } else if (this.tipo == 'Admin') {
      this.usuario = 'Admin';
      this.password = '11';
    } else if (this.tipo == 'Usuario') {
      this.usuario = 'Usuario';
      this.password = '33';
    } else if (this.tipo == 'J1') {
      this.usuario = 'J1';
      this.password = '44';
    } else if (this.tipo == 'J2') {
      this.usuario = 'J2';
      this.password = '55';
    }
  }

  private presentToast(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
}
