import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  loginUser(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  getUsers(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get(`${this.baseUrl}`, { params });
  }

  searchUsers(keyword: string, page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page)
      .set('size', size);

    return this.http.get(`${this.baseUrl}/search`, { params });
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
