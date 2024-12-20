import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { toDoTasks } from './task';
import { Task } from 'zone.js/lib/zone-impl';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  private baseURL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  getAll_S(): Observable<toDoTasks[]> {
    return this.httpClient.get<toDoTasks[]>(`${this.baseURL}/getall`);
  }

  createTask_S(title: string): Observable<toDoTasks> {
    return this.httpClient.post<toDoTasks>(`${this.baseURL}/create`, { title });
  }
  getCompletedTask_S(): Observable<toDoTasks[]> {
    return this.httpClient.get<toDoTasks[]>(`${this.baseURL}/getallbystatus/true`);
  }

  getNotCompletedTodo_S(): Observable<toDoTasks[]> {
    return this.httpClient.get<toDoTasks[]>(`${this.baseURL}/getallbystatus/false`);
  }

  updateStatus_S(id: number, todo: toDoTasks): Observable<toDoTasks> {
    return this.httpClient.put<toDoTasks>(`${this.baseURL}/StatusChange/${id}`, todo);
  }

  deleteTask_S(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
  }

  updateTaskById_S(id:number,todo:toDoTasks):Observable<toDoTasks>{
    return this.httpClient.put<toDoTasks>(`${this.baseURL}/update/${id}`,todo)
  }
  deleteCompletedTask_S(): Observable<toDoTasks[]>{
    return this.httpClient.delete<toDoTasks[]>(`${this.baseURL}/deleteall/Completed`);
  }
  deleteAllTask_S(): Observable<toDoTasks[]>{
    return this.httpClient.delete<toDoTasks[]>(`${this.baseURL}/deleteall/All`);
  }

}
