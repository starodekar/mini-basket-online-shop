import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular7-data-table';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { AuthService } from './services/auth.service';
import { CategoriesService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [ProductCardComponent, OrderDetailsComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    DataTableModule.forRoot()
  ],
  exports: [
    ProductCardComponent,
    OrderDetailsComponent,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    DataTableModule
  ],
  providers: [
    AuthService,
    UserService,
    CategoriesService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
