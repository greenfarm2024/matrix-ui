import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { Menu } from '../../interfaces/menu';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../dto/user';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  menu: Menu[] = [];

  isAuthenticated:boolean = false;
  isAdmin:boolean = false;
  isUser:boolean = false;

  user: UserDTO | null = null;
  errorMessage: string = '';
  firstName: string = '';

  constructor(private _menuService: MenuService, private readonly userService: UserService) { }
   

  ngOnInit(): void {
    this.getMenu();
    this.isAuthenticated = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin();
    this.isUser = this.userService.isUser();

    this.userService.getUserInfo().subscribe({
      next: (response: any) => {
        if (response && response.statusCode === 200 && response.user) {
          this.user = response.user;
          this.firstName = response.user.firstName;
          console.log('User info:', this.firstName);
          console.log('User object:', this.user);
        } else {
          this.errorMessage = 'Failed to fetch user info.';
        }
      },
      error: (err) => {
        console.error('Error fetching user info:', err);
        this.errorMessage = 'An error occurred while fetching user info.';
      }
    });
  }

  getMenu() {
    this._menuService.getMenu().subscribe(data => {
      this.menu = data;
    });
  }

}
