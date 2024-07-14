import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/api/tasks';

  constructor(private http: HttpClient) { }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }

  updateTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task._id}`;
    return this.http.patch<Task>(url, task);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTaskById(task: Task): Observable<Task[]> {
    const url = `${this.apiUrl}/${task._id}`;
    return this.http.get<Task[]>(url);
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task._id}`;
    return this.http.delete<Task>(url);
  }

}
