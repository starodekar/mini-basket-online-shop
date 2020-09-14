import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login()
  }

}

