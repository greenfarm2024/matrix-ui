import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { Menu } from '../../interfaces/menu';
import { UserService } from '../../../services/user.service';


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


  constructor(private _menuService: MenuService, private readonly userService: UserService) { }

  ngOnInit(): void {
    this.getMenu();
    this.isAuthenticated = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin();
    this.isUser = this.userService.isUser();
  }

  getMenu() {
    this._menuService.getMenu().subscribe(data => {
      this.menu = data;
    });
  }

}
