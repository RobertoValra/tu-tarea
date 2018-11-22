import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import FIRESTORE_CONFIG from '../firestore.config';
import UsersService from './services/users/users.service';
import GroupsService from './services/groups/groups.service';
import TasksService from './services/tasks/tasks.service';
import AuthGuard from './services/auth/auth-guard.service';
import AuthService from './services/auth/auth-service.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(FIRESTORE_CONFIG),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UsersService,
    GroupsService,
    TasksService,
    AuthGuard,
    AuthService,
    GooglePlus,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
