import { Component, OnInit } from '@angular/core';
import AuthService from '../../services/auth/auth-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import UsersService from 'src/app/services/users/users.service';
import {
  flatMap,
  take,
  map,
  mergeMap,
  subscribeOn,
  switchMap,
  first,
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
        this.user$
          .pipe(
            switchMap(userAuth => {
              this.user.id = userAuth.uid;
              return this.usersService.getUserById(this.user).pipe(
                tap(userData => {
                  if (!userData.length) {
                    this.usersService.addUser(this.user);
                  }
                })
              );
            })
          )
          .subscribe();
        this.router.navigate(['/user-type']);
      },
      err => {
        console.log(err);
      }
    );
  }
  doLogout() {
    this.authService.doSingOut().then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
