import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User> //Firebase user object

  constructor(private fireAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) {
    this.user$ = fireAuth.authState; //Gives the authentication state of the user
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '';
    localStorage.setItem('returnUrl', returnUrl);

    //Login with google
    this.fireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.fireAuth.auth.signOut()
  }

  //To map the user to AppUser interface
  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(switchMap((user: any) => {
      if (user) return this.userService.get(user.uid)

      return of(null);
    }))
  }
}
