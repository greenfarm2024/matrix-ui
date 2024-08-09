import { Injectable } from '@angular/core';
import { User } from '../components/interfaces/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { UserDTO } from '../dto/user';
import { map, Observable } from 'rxjs';

const baseUrl = `${environment.apiUrl}user/`;
const userUrl = `${baseUrl}users`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

 /*  listUsers: User[] = [
    {user: 'admin', firstName: 'Admin', lastName: 'Admin', sex: 'Male'},
    {user: 'migro', firstName: 'Migro', lastName: 'Migro', sex: 'Male'},
    {user: 'coop', firstName: 'Coop', lastName: 'Coop', sex: 'Female'},
    {user: 'aldi', firstName: 'Aldi', lastName: 'Aldi', sex: 'Male'},
    {user: 'migro1', firstName: 'Migro1', lastName: 'Migro1', sex: 'Female'},
    {user: 'kaufman', firstName: 'Kaufman', lastName: 'Kaufman', sex: 'Male'}
  ]; */
  listUsers: UserDTO[] = []; 


  constructor(private readonly http: HttpClient) { }

  getUser() {
    this.getAllUsers().subscribe(users => {
      this.listUsers = users;
    });
    return this.listUsers.slice();
  }

  getUserByIndex(index: number) {
    return this.listUsers[index];
  }

  deleteUser(index: number) {
    this.listUsers.splice(index, 1);
  }

  addUser(user: UserDTO) {
    this.listUsers.unshift(user);
  }

  updateUser(index: number, updatedUser: UserDTO): void {
    if (index >= 0 && index < this.listUsers.length) {
      this.listUsers[index] = updatedUser;
    } else {
      console.error(`User index ${index} is out of bounds.`);
    }
  }

/*   getAllUsers(): Observable<UserDTO[]> {
		return this.http.get<UserDTO[]>(userUrl);
	} */

    getAllUsers(): Observable<UserDTO[]> {
      return this.http.get<UserDTO[]>(userUrl);
    }


}
