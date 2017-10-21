import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
/*
  Generated class for the CosasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CosasProvider {

  constructor(public http: Http, public afDB: AngularFireDatabase) {
    // console.log('Hello CosasProvider Provider');
  }

  saveImagen(base64Image: string []) {
    base64Image.forEach(imgSelecc=>{
      imgSelecc["seleccionada"] = false;
    })//Recorro imagenes seleccionadas  
    return this.afDB.database.ref('Imagenes/').push(base64Image);
  }

  eliminarImagen(imagen){
    // Create a reference to the file to delete
    var desertRef = this.afDB.database.ref('Imagenes/').child(imagen);

    // Delete the file
    desertRef.remove();
  }
  getImagenes() {
    return this.afDB.list('Imagenes/');   
  }



}
