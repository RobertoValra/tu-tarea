import { Component } from '@angular/core';
import UsersService from '../../services/users/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  users: Observable<User[]>; // this is the call from firestore
  // this is the model to add users
  user: User = {
    id: '',
    email: ''
  };
  constructor(private userService: UsersService) {
    this.users = this.userService.getUsers();
  }
  getUsers() {
    return this.userService.getUsers();
  }
  addUser(user: User) {
    this.userService.addUser(user);
  }
  updateUser(user: User) {
    this.userService.updateUser(user);
  }
  deleteUser(user: User) {
    this.userService.deleteUSer(user);
  }
  setCurrentUser(user: User) {
    console.log(user);
    this.user = user;
  }
}
