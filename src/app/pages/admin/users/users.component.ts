import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { AdminModalComponent } from '../../../components/admin-modal/admin-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule, AdminModalComponent, NgxPaginationModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users: any = [];
  usersPaginated: any = [];
  currentPage: number = 1;
  pageSize: number = 5;
  showModal: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
   this.getUsers();
  }

  getUsers(): void {
     this.userService.getAllUsers().subscribe({
      next: (res) => {
        console.log(res);
        this.users = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  onUserAdded(): void {
    this.getUsers();
    this.toggleModal();
  }

  get startIndex(): number {
    return this.users.length === 0 ? 0 : (this.currentPage -1 ) * this.pageSize + 1
  }

  get endIndex(): number {
    const end = this.currentPage * this.pageSize
    return end > this.users.length ? this.users.length : end;
  }

}
