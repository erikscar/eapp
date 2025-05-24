import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute) { }
  product:any = {};

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productService.getProductById(Number(params.get('id'))).subscribe({
        next: (res) => {
          console.log(res);
          this.product = res;
        },
        error: (err) => {
          console.log(err)
        },
      })
    })

  }

    addProductTocart(productId: number): void{
    this.cartService.addProductToCart(productId).subscribe({
      next:(res) => {
        console.log(res.message)
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
}
