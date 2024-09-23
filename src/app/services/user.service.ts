import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { UserDTO } from '../dto/user';
import { catchError, Observable, of } from 'rxjs';

const baseUrl = `${environment.apiUrl}admin/`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }

  register(token: string, user: UserDTO): Observable<UserDTO> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<UserDTO>(`${baseUrl}admin/register`, user, { headers });
  }

  getAllUsers(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${baseUrl}getallusers`, { headers });
  }

  updateUser(token: string, user: UserDTO): Observable<UserDTO> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<UserDTO>(`${baseUrl}updateuser`, user, { headers });
  }

  getUserById(token: string, userId: string): Observable<UserDTO> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<UserDTO>(`${baseUrl}getuserbyid/${userId}`, { headers });
  }

  deleteUser(token: string, userId: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<void>(`${baseUrl}deleteuser/${userId}`, { headers });
  }

  login(userName: string, password: string): Observable<any> {
    const url = `${baseUrl}auth/login`;
    return this.http.post<any>(url, { userName, password });
  }

  getUserInfo(): Observable<UserDTO | null> {
    const token = localStorage.getItem('token'); // Ensure the token is retrieved from a secure place
    if (!token) {
      console.error('Token not found');
      return of(null);
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<UserDTO>(`${baseUrl}auth/userinfo`, { headers })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.error('Error fetching user info:', err.message);
          return of(null);
        })
      );
  }

    /***AUTHEMNTICATION METHODS */
    logOut():void{
      if(typeof localStorage !== 'undefined'){
        localStorage.removeItem('token')
        localStorage.removeItem('role')
      }
    }
  
    isAuthenticated(): boolean {
      if(typeof localStorage !== 'undefined'){
        const token = localStorage.getItem('token');
        return !!token;
      }
      return false;
  
    }
  
    isAdmin(): boolean {
      if(typeof localStorage !== 'undefined'){
        const role = localStorage.getItem('role');
        return role === 'ADMIN'
      }
      return false;
  
    }
  
    isUser(): boolean {
      if(typeof localStorage !== 'undefined'){
        const role = localStorage.getItem('role');
        return role === 'USER'
      }
      return false;
  
    }
  
}