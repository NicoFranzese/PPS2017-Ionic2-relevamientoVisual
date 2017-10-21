import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';
import { CosasProvider } from '../../providers/cosas/cosas';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the CosasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cosas',
  templateUrl: 'cosas.html',
})
export class CosasPage {

  private tipoImg: string;
  private base64Image: string;
  private imag = { imagen: '', usuario: '', tipoImg: '', seleccionada: false };
  private mostrar: boolean = false;
  private imagenes = [];
  private imagenesParaSubir = [];  
  private loading;
  private show;

  constructor(public navCtrl: NavController, public cameraCtrl: Camera, 
              private toastCtrl: ToastController, public navParams: NavParams,
              public servicioCosas: CosasProvider,private loadingCtrl: LoadingController) {
                this.show = true;
                //this.createLoading("Cargando");
                this.tipoImg = localStorage.getItem("queCosa");
                //this.getImagenes();
                
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CosasPage');
  }

  tomarFoto() {
    this.imag = { imagen: '', usuario: '', tipoImg: '', seleccionada: false };
    this.cameraCtrl.getPicture({
      destinationType: this.cameraCtrl.DestinationType.DATA_URL,
      targetWidth: 800,
      targetHeight: 800
    }).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.imag.imagen = this.base64Image;
      // this.imag.usuario = this.fireDbProvider.auth.getUser().email;
      this.imag.usuario = localStorage.getItem("usuario");
      //this.imag.tipoImg = this.tipoImg;
      this.imag.tipoImg = localStorage.getItem("queCosa");
      this.imag.seleccionada = false;
      this.imagenes.push(this.imag);
      this.mostrar = true;
    }, (err) => {
      console.log(err);
      if (err.mensaje) {
        this.presentToast("Error");
      }
    });
  }

  seleccionar(imagenSeleccionada) {
    this.imagenes.forEach(e => {
      if (e.imagen == imagenSeleccionada && e.seleccionada == true) {
        e.seleccionada = false;
      } else if (e.imagen == imagenSeleccionada && e.seleccionada == false) {
        e.seleccionada = true;
      }
    });
  }

  Subir() {
    this.imagenesParaSubir = this.imagenes.filter(
      function (img) { 
        return img.seleccionada == true ? img.imagen : '' 
      })

    if (this.imagenesParaSubir.length == 0) {
      this.presentToast('Seleccione una imagen');
    } else {
      this.servicioCosas.saveImagen(this.imagenesParaSubir).then(res => {
        this.imagenes = [];
        this.presentToast('Las imagenes seleccionadas se subieron exitosamente, las imágenes repetidas no fueron subidas')
      }).catch(err => {
        this.presentToast('Ocurrio un error');
      })
    }
  }

  // getImagenes() {
  //   this.servicioCosas.getImagenes().subscribe(res => { 
  //    // console.log(res);
  //     this.imagenes= [];
      
  //     res.forEach(img=>{
  //       img.forEach(i =>{
  //         if ((i.tipoImg === this.tipoImg) && (i.usuario === localStorage.getItem("usuario"))) {
  //           this.imagenes.push(i);
  //         }          
  //       });
  //     })
  //     this.show = false;
  //   })
  // }




  private presentToast(mensaje) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  private createLoading(message: string) {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: `
      <div class="custom-spinner-container" *ngIf="show">
        <div class="custom-spinner-box mt-2" *ngIf="show">
        <img src="./assets/img/logo2.png" width="80">
        </div>
      </div>` + message
    });
    this.loading.present();
  }

}
