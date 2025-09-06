import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

const API_BASE_URL = 'back-crud-8t75.onrender.com';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${API_BASE_URL}/tasks`;

  private tasksSubject = new BehaviorSubject<any[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  private showFormSubject = new BehaviorSubject<boolean>(false);
  showForm$ = this.showFormSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchTasks(): Observable<any[]> {
    const cacheBuster = `?v=${new Date().getTime()}`;
    return this.http
      .get<any[]>(this.apiUrl + cacheBuster)
      .pipe(tap((tasks) => this.tasksSubject.next(tasks)));
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

  deleteComment(taskId: number, commentId: number): Observable<any> {
    const url = `${this.apiUrl}/${taskId}/comments/${commentId}`;
    return this.http.delete(url);
  }
}
