import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { UserDTO } from '../dto/user';
import { Observable } from 'rxjs';

const baseUrl = `${environment.apiUrl}user/`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }

  addUser(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${baseUrl}adduser`, user);
  }

  fetchAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${baseUrl}fetchallusers`);
  }

  updateUser(user: UserDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(`${baseUrl}updateuser/${user.userId}`, user);
  }

  fetchUserById(userId: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${baseUrl}fetchuserbyid/${userId}`);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}deleteuser/${userId}`);
  }
}