import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  products: any;

  constructor(private route: ActivatedRoute ,private productService: ProductService) {}
  searchValue: string = "";

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchValue = params['searchValue'];
      this.productService.getProductsBySearchValue(this.searchValue).subscribe({
        next: (res) => {
          console.log(res)
          this.products = res;
        },
        error: (err) => {
          console.log(err);
        }
      })
    })
    
  }
}
