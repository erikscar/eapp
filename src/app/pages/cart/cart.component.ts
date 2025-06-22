import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) { }
  cart: any = {};
  ngOnInit(): void {
   this.loadCartProducts();
  }

  loadCartProducts(): void {
     this.cartService.getCartByUserId().subscribe({
      next: (res) => {
        console.log("Carrinho: " + res)
        this.cart = res;

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

    removeProductFromCart(productId: number): void {
      this.cartService.removeProductFromCart(productId).subscribe({
        next: (res) => {
          console.log(res.message)
          this.loadCartProducts();
        },
        error: (err) => {
          console.log(err)
        }
      })
    }

    addProductToCart(productId: number): void {
      this.cartService.addProductToCart(productId).subscribe({
        next: (res) => {
          console.log(res);
          this.loadCartProducts();
        },
        error: (err) => {
          console.log(err);
        }
       })
    }
}
