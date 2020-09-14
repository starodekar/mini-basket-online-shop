import { AppUser } from './../../../shared/models/app-user';
import { ShoppingCartService } from './../../../shared/services/shopping-cart.service';
import { UserService } from './../../../shared/services/user.service';
import { AuthService } from './../../../shared/services/auth.service';
import { ShoppingCart } from './../../../shared/models/shopping-cart';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appUser: AppUser
  cart$: Observable<ShoppingCart>;

  constructor(public authService: AuthService, private cartService: ShoppingCartService, private userService: UserService) { }

  async ngOnInit() {
    this.authService.appUser$.subscribe(user => this.appUser = user);
    this.cart$ = await this.cartService.getCart();
  }

  logout() {
    this.authService.logout()
  }
}