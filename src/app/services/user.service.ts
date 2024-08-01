import { Injectable } from '@angular/core';
import { User } from '../components/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  listUsers: User[] = [
    {user: 'admin', firstName: 'Admin', lastName: 'Admin', sex: 'M'},
    {user: 'migro', firstName: 'Migro', lastName: 'Migro', sex: 'M'},
    {user: 'coop', firstName: 'Coop', lastName: 'Coop', sex: 'F'},
    {user: 'aldi', firstName: 'Aldi', lastName: 'Aldi', sex: 'M'},
    {user: 'migro1', firstName: 'Migro1', lastName: 'Migro1', sex: 'F'},
    {user: 'kaufman', firstName: 'Kaufman', lastName: 'Kaufman', sex: 'M'}
  ];


  constructor() { }

  getUser() {
    return this.listUsers.slice();
  }

  deleteUser(index: number) {
    this.listUsers.splice(index, 1);
  }
}
