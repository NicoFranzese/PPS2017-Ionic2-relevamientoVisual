import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera';

// import { AboutPage } from '../pages/about/about';
// import { ContactPage } from '../pages/contact/contact';
// import { HomePage } from '../pages/home/home';
// import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { CosasPage } from '../pages/cosas/cosas';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CONFIG } from './firebase';
// import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { CosasProvider } from '../providers/cosas/cosas';
import { Menu2Page } from '../pages/menu2/menu2';
import { GaleriaPage } from '../pages/galeria/galeria';
import { MovimientoPage } from '../pages/movimiento/movimiento';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';

@NgModule({
  declarations: [
    MyApp,
    // AboutPage,
    // ContactPage,
    // HomePage,
    // TabsPage,
    LoginPage,
    MenuPage,
    CosasPage,
    Menu2Page,
    GaleriaPage,
    MovimientoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(CONFIG),
    AngularFireDatabaseModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // AboutPage,
    // ContactPage,
    // HomePage,
    // TabsPage,
    LoginPage,
    MenuPage,
    CosasPage,
    Menu2Page,
    GaleriaPage,
    MovimientoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    DeviceMotion,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CosasProvider
  ]
})
export class AppModule {}
