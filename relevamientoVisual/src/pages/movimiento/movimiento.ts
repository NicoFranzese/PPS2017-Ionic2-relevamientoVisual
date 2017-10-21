import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CosasProvider } from '../../providers/cosas/cosas';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
/**
 * Generated class for the MovimientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-movimiento',
  templateUrl: 'movimiento.html',
})

export class MovimientoPage {
  private imagenes = [];
  private loading;
  private show;
  private tipoImg: string;
  private indice = 0;

  private lastX: number;
  private lastY: number;
  private lastZ: number;
  private moveCounter: number = 0;
  private cont = 0;
  private coordenadas;
  private bandera = false;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams,
    public servicioCosas: CosasProvider, private loadingCtrl: LoadingController, private deviceMotion: DeviceMotion,
    public platform: Platform) {
    this.tipoImg = localStorage.getItem("queCosa");
    this.getImagenes();

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MovimientoPage');

  }

  ngOnInit() {
    this.movimiento2();
  }

  getImagenes() {
    this.servicioCosas.getImagenes().subscribe(res => {
      this.imagenes = [];

      res.forEach(img => {
        img.forEach(i => {
          if ((i.tipoImg === this.tipoImg) && (i.usuario === localStorage.getItem("usuario"))) {
            this.imagenes.push(i);
          }
        });
        this.cont = this.cont + 1
      })
    })
  }

  movimiento2() {
    var subscription = this.deviceMotion.watchAcceleration({ frequency: 50 }).subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log(acceleration);

      if ((acceleration.x < 0 - 5) && (this.bandera == false)) {
        this.bandera = true;
          if (this.indice > (this.cont - 1)) {
            this.indice = 0;
          } else {
            this.indice += 1;
            this.imagenes[this.indice];
          }        
      }
      
      if ((acceleration.x > 0 + 5) && (this.bandera == false)){
        this.bandera = true;
          if (this.indice > (this.cont - 1)) {
            this.indice = 0;
          } else {
            this.indice -= 1;
            this.imagenes[this.indice];
          }
        }    

        if ((acceleration.x > 0 - 2) && (acceleration.x < 0 + 2)){
          this.bandera = false;
        }
    });
  }




}
