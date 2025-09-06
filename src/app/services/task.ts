import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { createConsumer } from '@rails/actioncable';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  private tasksSubject = new BehaviorSubject<any[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  private showFormSubject = new BehaviorSubject<boolean>(false);
  showForm$ = this.showFormSubject.asObservable();

  constructor(private http: HttpClient) {
    createConsumer('ws://localhost:3000/cable').subscriptions.create('TasksChannel', {
      // A CORREÇÃO ESTÁ AQUI
      received: (taskData: any) => {
        this.updateTasksState(taskData);
      },
    });
  }

  // O resto do arquivo continua igual...
  fetchTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(tap((tasks) => this.tasksSubject.next(tasks)));
  }

  toggleFormVisibility(): void {
    this.showFormSubject.next(!this.showFormSubject.value);
  }

  addTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);
  }

  updateTask(task: any): Observable<any> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put(url, task);
  }

  deleteTask(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  private updateTasksState(task: any) {
    const currentTasks = this.tasksSubject.getValue();
    const index = currentTasks.findIndex((t) => t.id === task.id);
    let updatedTasks = [...currentTasks];

    if (index > -1) {
      updatedTasks[index] = task;
    } else {
      updatedTasks.push(task);
    }
    this.tasksSubject.next(updatedTasks);
  }
}
