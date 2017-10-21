import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CosasProvider } from '../../providers/cosas/cosas';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the GaleriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-galeria',
  templateUrl: 'galeria.html',
})
export class GaleriaPage {
  private imagenes = [];
  private imagenesParaSubir = [];  
  private loading;
  private show;
  private tipoImg: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private toastCtrl: ToastController,
              public servicioCosas: CosasProvider,private loadingCtrl: LoadingController) {
                this.tipoImg = localStorage.getItem("queCosa");
                this.getImagenes();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad GaleriaPage');
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
  
  Eliminar() {
    this.imagenesParaSubir = this.imagenes.filter(
      function (img) { 
        return img.seleccionada == true ? img.imagen : '' 
      })

    if (this.imagenesParaSubir.length == 0) {
      this.presentToast('Seleccione una Imagen para eliminar');
    } else {
      
      this.servicioCosas.getImagenes().subscribe(res => { 
         res.forEach(img=>{
          var cont = 0;
           img.forEach(i =>{

            this.imagenesParaSubir.forEach(imgSelecc=>{
                if (imgSelecc.imagen === i.imagen) {
                  this.servicioCosas.eliminarImagen(img.$key + "/" + cont);
                }          
            })//Recorro imagenes seleccionadas  

            cont = cont + 1;
           });//Recorro cada imagen de la nube
         })
       })
    }
  }

  getImagenes() {
    this.servicioCosas.getImagenes().subscribe(res => { 
     // console.log(res);
      this.imagenes= [];
      
      res.forEach(img=>{
        img.forEach(i =>{
          if ((i.tipoImg === this.tipoImg) && (i.usuario === localStorage.getItem("usuario"))) {
            this.imagenes.push(i);
          }          
        });
      })
      this.show = false;
    })
  }




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
