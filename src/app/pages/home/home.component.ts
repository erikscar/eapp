import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import User from '../../interfaces/User';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    createdAt: '',
    phone: '',
    imageUrl: ''
  };

  products: any[] = [];
  

  constructor(private userService: UserService, private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
     this.userService.getUser().subscribe({
       next: (res) => {
         console.log(res);
         this.user = res;
       },
       error: (err) => {
         console.log(err)
       }
     })

     this.productService.getProducts().subscribe({
      next: (res) => {
        console.log("Produtos: " + res);
        this.products = res;
      },
      error: (err) => {
        console.log(err)
      },
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
