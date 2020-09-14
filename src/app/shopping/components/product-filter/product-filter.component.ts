import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from './../../../shared/models/category';
import { CategoriesService } from './../../../shared/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  @Input('category') category: string;
  cat: string = null;

  categories$: Observable<Category[]>;

  constructor(private categoryService: CategoriesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
  }

  // This is a work-around as category is not reflecting in the HTML 
  ngOnChanges() {
    this.cat = this.category;
  }

}
