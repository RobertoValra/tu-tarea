import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export default class AuthService {
  user: Observable<firebase.User>;
  constructor(
    public afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private platform: Platform
  ) {
    this.user = this.afAuth.authState;
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth.signInWithPopup(provider).then(res => {
        resolve(res);
      });
    });
  }
  doGooglePlusLogin() {
    if (this.platform.is('cordova')) {
      return this.nativeGoogleLogin();
    } else {
      return this.doWebGoogleLogin();
    }
  }
  async nativeGoogleLogin() {
    try {
      const gPlusUser = await this.gplus.login({
        webClientId:
          '447312177906-kp10uf8equluadb31mnrggbp9jt4nr5q.apps.googleusercontent.com',
        offline: true,
        scopes: 'profile email'
      });
       await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gPlusUser.idToken)
      );
      this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    } catch (err) {
      console.log(err);
    }
  }

  async doWebGoogleLogin() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
    } catch (err) {
      console.log(err);
    }
  }
  async doSingOut() {
    this.afAuth.auth.signOut();
    if (this.platform.is('cordova')) {
       this.gplus.logout();
    }
  }
}
