import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import User from '../../interfaces/User';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Address from '../../interfaces/Address';
import { AddressService } from '../../services/address/address.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  user!: User;
  address!: Address;

  constructor(private userService: UserService, private addressService: AddressService, private router: Router) {}
  searchForm = new FormGroup({
    searchValue: new FormControl(''),
  });

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.addressService.getAddressByUser().subscribe({
      next: (res) => {
        console.log(res);
        this.address = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  searchForProducts(): void {
    const searchValue = this.searchForm.get('searchValue')?.value?.trim();
    
    this.router.navigate(['/search'], { queryParams: { searchValue: searchValue } });
    this.searchForm.reset()
  }
}
