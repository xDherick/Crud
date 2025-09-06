import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { createConsumer } from '@rails/actioncable';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://back-crud-8t75.onrender.com/tasks';

  private tasksSubject = new BehaviorSubject<any[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  private showFormSubject = new BehaviorSubject<boolean>(false);
  showForm$ = this.showFormSubject.asObservable();

  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {
    if (isPlatformBrowser(this.platformId)) {
      createConsumer('ws://back-crud-8t75.onrender.com/cable').subscriptions.create(
        'TasksChannel',
        {
          received: (taskData: any) => {
            this.updateTasksState(taskData);
          },
        }
      );
    }
  }

  fetchTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(tap((tasks) => this.tasksSubject.next(tasks)));
  }

  toggleFormVisibility(): void {
    this.showFormSubject.next(!this.showFormSubject.value);
  }

  addTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, { task });
  }

  updateTask(task: any): Observable<any> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put(url, { task });
  }

  deleteTask(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  addComment(taskId: number, comment: { author: string; content: string }): Observable<any> {
    const url = `${this.apiUrl}/${taskId}/comments`;
    return this.http.post(url, { comment });
  }

  private updateTasksState(taskData: any) {
    let currentTasks = this.tasksSubject.getValue();

    if (taskData.deleted) {
      this.tasksSubject.next(currentTasks.filter((t) => t.id !== taskData.id));
    } else {
      const index = currentTasks.findIndex((t) => t.id === taskData.id);
      if (index > -1) {
        currentTasks[index] = taskData;
        this.tasksSubject.next([...currentTasks]);
      } else {
        this.tasksSubject.next([taskData, ...currentTasks]);
      }
    }
  }
}
