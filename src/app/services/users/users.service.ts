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
  private userById$: Observable<any>;
  private userType: string;
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
          return data.id === user.id ? { id, ...data } : false;
        });
      })
    );
  }
  getUsersByIdQuery(user: User): Observable<any> {
    return Observable.create(subscriber => {
      this.usersColl.ref
        .where('id', '==', user.id)
        .onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
          console.log(snapshot.docs.shift().data());
          subscriber.next(snapshot.docs.length);
        });
    });
  }
  updateMultiple(user: User) {
    const docRef = this.usersColl.ref.doc(user.id);
    return this.db.firestore.runTransaction(transaction => {
      return transaction.get(docRef).then(data => {
        if (!data.exists) {
          throw new Error('Document does not exist!');
        }
        transaction.update(docRef, { type: 'padre' });
      });
    });
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
