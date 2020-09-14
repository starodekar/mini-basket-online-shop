import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Category } from './../models/category';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(): Observable<Category[]> {
    return this.db.list<Category>('/categories').valueChanges();
  }
}
