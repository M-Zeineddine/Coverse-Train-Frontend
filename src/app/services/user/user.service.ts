import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/users`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/users/${id}`);
  }

  addUser(body: IUser): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/users`, body);
  }

  updateUser(id: number, body: IUser): Observable<any> {
    return this.http.patch<any>(`${environment.baseUrl}/users/${id}`, body);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/users/${id}`);
  }
}

