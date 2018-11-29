import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export default class UsersService {
  private usersColl: AngularFirestoreCollection<User>;
  constructor(private db: AngularFirestore) {
    this.usersColl = this.db.collection<User>('/users');
  }
  addUser(user: User) {
    this.usersColl.add(user);
  }
  deleteUSer(user: User) {
    this.usersColl.doc(user.id).delete();
  }
  updateUser(user: User) {
    this.usersColl.doc(user.id).update(user);
  }
  getUserById(user: User) {
    console.log('getUserById', user.id);
    return this.usersColl.snapshotChanges().pipe(
      map(actions => {
        return actions.filter(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return (data.id === user.id) ? { id, ...data } : false;
        });
      })
    );
  }
  getUsers() {
    return this.usersColl.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}
