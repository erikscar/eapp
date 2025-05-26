import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  product: any = {};
  reviews: any = [];
  showReviewBtn = false;
  stars = [1, 2, 3, 4, 5];
  reviewForm: FormGroup;

  constructor(private productService: ProductService, private cartService: CartService, private reviewService: ReviewService, private route: ActivatedRoute) {
    this.reviewForm = new FormGroup({
      content: new FormControl(""),
      rating: new FormControl(0)
    })
  }

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

      this.loadReviews(Number(params.get('id')))
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
  return Array(Math.round(rating)).fill(0);
}

  setRating(star: number) {
    this.reviewForm.patchValue({ rating: star });
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

  addReview(form: FormGroup, productId: number) {
    this.reviewService.addReview(form.value, productId).subscribe({
      next: (res) => {
        console.log(res.message)
        this.loadReviews(productId);
        this.reviewForm.reset();
      },
      error: (err) => {
        console.log(err)
      }
    });

  }
  loadReviews(productId: number) {
    this.reviewService.getAllReviewsFromProduct(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.reviews = res;
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
}
