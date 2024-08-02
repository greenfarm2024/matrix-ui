import { Injectable } from '@angular/core';
import { User } from '../components/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  listUsers: User[] = [
    {user: 'admin', firstName: 'Admin', lastName: 'Admin', sex: 'Male'},
    {user: 'migro', firstName: 'Migro', lastName: 'Migro', sex: 'Male'},
    {user: 'coop', firstName: 'Coop', lastName: 'Coop', sex: 'Female'},
    {user: 'aldi', firstName: 'Aldi', lastName: 'Aldi', sex: 'Male'},
    {user: 'migro1', firstName: 'Migro1', lastName: 'Migro1', sex: 'Female'},
    {user: 'kaufman', firstName: 'Kaufman', lastName: 'Kaufman', sex: 'Male'}
  ];


  constructor() { }

  getUser() {
    return this.listUsers.slice();
  }

  getUserByIndex(index: number) {
    return this.listUsers[index];
  }

  deleteUser(index: number) {
    this.listUsers.splice(index, 1);
  }

  addUser(user: User) {
    this.listUsers.unshift(user);
  }

  updateUser(index: number, updatedUser: User): void {
    if (index >= 0 && index < this.listUsers.length) {
      this.listUsers[index] = updatedUser;
    } else {
      console.error(`User index ${index} is out of bounds.`);
    }
  }
  
}
