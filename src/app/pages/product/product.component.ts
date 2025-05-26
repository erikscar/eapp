import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService, private cartService: CartService, private reviewService: ReviewService, private route: ActivatedRoute) { }
  product: any = {};
  reviews: any = [];

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

      this.reviewService.getAllReviewsFromProduct(Number(params.get('id'))).subscribe({
        next: (res) => {
          console.log(res);
          this.reviews = res;
        },
        error: (err) => {
          console.log(err)
        },
      })
    })
  }

  addProductTocart(productId: number): void {
    this.cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res.message)
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating))
  }

  getTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHr / 24);

  if (diffSec < 60) return 'há poucos segundos';
  if (diffMin < 60) return `há ${diffMin} minuto(s)`;
  if (diffHr < 24) return `há ${diffHr} hora(s)`;
  return `há ${diffDays} dia(s)`;
}
}
