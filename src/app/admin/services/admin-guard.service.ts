import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from './../../shared/services/auth.service';
import { UserService } from './../../shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate() {
    return this.auth.appUser$
      .pipe(map((appUser:any) => appUser.isAdmin))
  }
}

