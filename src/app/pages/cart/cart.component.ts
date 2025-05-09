import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) { }
  cart: any = {};
  ngOnInit(): void {
    this.cartService.getCartByUserId().subscribe({
      next: (res) => {
        console.log(res)
        this.cart = res;

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

    
}
