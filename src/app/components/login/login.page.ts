import { Component, OnInit } from '@angular/core';
import AuthService from '../../services/auth/auth-service.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import UsersService from 'src/app/services/users/users.service';
import {
  switchMap,
  tap
} from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  user$: Observable<firebase.User>;
  user: User;
  googlePlusUser$: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router,
    private usersService: UsersService
  ) {
    this.user$ = this.authService.user;
    this.user = {
      id: '',
      key: '',
      email: ''
    };
  }
  ngOnInit() {}
  doGooglePlusLogin() {
    this.authService.doGooglePlusLogin().then(
      res => {
       this.googlePlusUser$ =  this.user$
          .pipe(
            switchMap(userAuth => {
              if (userAuth) {
                this.user.id = userAuth.uid;
                return this.usersService.getUsersByIdQuery(this.user).pipe(
                  tap((userData: number) => {
                    if (!userData) {
                      this.usersService.addUser(this.user);
                    }
                  })
                );
              }
            })
          )
          .subscribe();
        // this.router.navigate(['/user-type']);
      },
      err => {
        console.log(err);
      }
    );
  }
  doLogout() {
    this.authService.doSingOut().then(
      res => {
        this.googlePlusUser$.unsubscribe();
      },
      err => {
        console.log(err);
      }
    );
  }
}
