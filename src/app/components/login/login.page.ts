import { Component, OnInit } from '@angular/core';
import AuthService from '../../services/auth/auth-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  user$: Observable<firebase.User>;
  constructor(private authService: AuthService, private router: Router) {
    this.user$ = this.authService.user;
  }
  ngOnInit() {}
  doGoogleLogin() {
    this.authService.doGoogleLogin().then(
      res => {
        console.log(res);
        this.router.navigate(['/user-type']);
      },
      err => {
        console.log(err);
      }
    );
  }
  doGooglePlusLogin() {
    this.authService.doGooglePlusLogin().then(
      res => {
        console.log(res);
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
