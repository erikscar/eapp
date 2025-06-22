import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  products: any;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }
  searchValue: string = "";

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchValue = params['searchValue'];
      const category = params['category'];


      if(this.searchValue && this.searchValue.trim().length > 0 ) {
         this.productService.getProductsBySearchValue(this.searchValue).subscribe({
        next: (res) => {
          console.log(res)
          this.products = res;
        },
        error: (err) => {
          console.log(err);
        }
      })
      } else if (category) {
        this.searchValue = category;
        this.productService.getProductByCategory(category).subscribe({
          next: (res) => {
            this.products = res;
          },
          error: (err) => {
            console.log(err);
          }
        })
      } else {
        this.searchValue = "Todos os Produtos"
        this.productService.getProducts().subscribe({
          next: (res) => {
            this.products = res;
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    })
  }

  sortProducts(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const order = selectElement.value;

    switch (order) {
      case 'price-asc':
        this.products.sort((a: any, b: any) => a.price - b.price);
        break;
      case 'price-desc':
        this.products.sort((a: any, b: any) => b.price - a.price);
        break;
      case 'name-desc':
        this.products.sort((a: any, b: any) => a.name.localeCompare(b.name));
        break;
      case 'name-asc':
        this.products.sort((a: any, b: any) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
  }
}
