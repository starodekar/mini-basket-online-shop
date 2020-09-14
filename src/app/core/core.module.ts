import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
