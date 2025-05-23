import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
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
    imageUrl: '',
    address: undefined
  };

  index: number = 0;
  productsPerSection = 5;
  products: any[] = [];
  

  constructor(private userService: UserService, private productService: ProductService, private cartService: CartService, private router: Router) { }

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

  searchByCategory(category: string): void {
    this.router.navigate(["/search"], { queryParams: { category }})
  }

  onCarrouselClick(direction: 'left' | 'right'): void {
    const total = this.products.length;

  if (direction === 'right') {
    const nextIndex = this.index + this.productsPerSection;
    if (nextIndex < total) {
      this.index = nextIndex;
    }
  } else {
    const prevIndex = this.index - this.productsPerSection;
    if (prevIndex >= 0) {
      this.index = prevIndex;
    }
  }
  }

}
