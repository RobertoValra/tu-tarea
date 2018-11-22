import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export default class GroupsService {
  private groupsColl: AngularFirestoreCollection<Group>;
  constructor(private db: AngularFirestore) {
    this.groupsColl = this.db.collection<Group>('./groups');
  }
  addGroup(group: Group) {
    const { name } = group;
    this.groupsColl.add({ name });
  }
  updateGroup(group: Group) {
    this.groupsColl.doc(group.id).update(group);
  }
  deleteGroup(group: Group) {
    this.groupsColl.doc(group.id).delete();
  }
  getGroups() {
   return this.groupsColl.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Group;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}
