import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export default class TasksService {
  private taskColl: AngularFirestoreCollection<TaskWork>;
  constructor(private db: AngularFirestore) {
    this.taskColl = this.db.collection<TaskWork>('./tasks');
  }

  addTask(task: TaskWork) {
    const { title } = task;
    this.taskColl.add({ title });
  }
  updateTask(task: TaskWork) {
    this.taskColl.doc(task.id).update(task);
  }
  deleteTask(task: TaskWork) {
    this.taskColl.doc(task.id).delete();
  }
  getTasks() {
    return this.taskColl.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as TaskWork;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}
