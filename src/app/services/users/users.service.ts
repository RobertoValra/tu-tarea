import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
@Injectable()
export default class UsersService {
  private usersColl: AngularFirestoreCollection<User>;
  constructor(private db: AngularFirestore) {
    this.usersColl = this.db.collection<User>('/users');
  }
  addUser(user: User) {
    const { email } = user;
    this.usersColl.add({email});
  }
  deleteUSer(user: User) {
    this.usersColl.doc(user.id).delete();
  }
  updateUser(user: User) {
    this.usersColl.doc(user.id).update(user);
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
