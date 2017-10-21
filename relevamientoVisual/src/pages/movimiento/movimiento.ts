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

  private lastX:number;
  private lastY:number;
  private lastZ:number;
  private moveCounter:number = 0;
  private cont = 0;
  private coordenadas;

  constructor(public navCtrl: NavController,  private toastCtrl: ToastController, public navParams: NavParams,
    public servicioCosas: CosasProvider,private loadingCtrl: LoadingController, private deviceMotion: DeviceMotion,
    public platform:Platform) {
      this.tipoImg = localStorage.getItem("queCosa");
      localStorage.setItem("coordenadas","0");
      this.getImagenes();   

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MovimientoPage');
    
  }

  async ngOnInit() {
      await this.movimiento();
  }

  getImagenes() {
    this.servicioCosas.getImagenes().subscribe(res => { 
      this.imagenes= [];
      
      res.forEach(img=>{
        img.forEach(i =>{
          if ((i.tipoImg === this.tipoImg) && (i.usuario === localStorage.getItem("usuario"))) {
            this.imagenes.push(i);
          }          
        });
        this.cont = this.cont + 1
      })
    })
  }


  movimiento(){
    //this.platform.ready().then(() => {
      var subscription = this.deviceMotion.watchAcceleration({frequency:200}).subscribe(acc => {
        //console.log(acc);
  
        if(!this.lastX) {
          this.lastX = acc.x;
          this.lastY = acc.y;
          this.lastZ = acc.z;
          //return;
        }
  
        let deltaX:number, deltaY:number, deltaZ:number;
        deltaX = Math.abs(acc.x-this.lastX);
        deltaY = Math.abs(acc.y-this.lastY);
        deltaZ = Math.abs(acc.z-this.lastZ);
  
        if(deltaX + deltaY + deltaZ > this.cont) {
          this.moveCounter++;
        } else {
          this.moveCounter = Math.max(0, --this.moveCounter);
        }
  
        if(this.indice > (this.cont - 1)) { 
          //console.log('SHAKE');
          //this.loadCats(); 
          this.indice=0; 
        }
    
        this.lastX = acc.x;
        this.lastY = acc.y;
        this.lastZ = acc.z;
  

        if (this.lastX < 0) {
          this.indice = this.indice + 1;
        }else if (this.lastX > 0) {
          this.indice = this.indice - 1;
        }
    
        return this.imagenes[this.indice];
        
      });
  

  
      // alert(this.lastX);
      // alert(this.lastY);
      // alert(this.lastZ);
      // alert(this.moveCounter);
  
   // });
  }
  



}
