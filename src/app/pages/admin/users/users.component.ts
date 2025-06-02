import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { AdminModalComponent } from '../../../components/admin-modal/admin-modal.component';

@Component({
  selector: 'app-users',
  imports: [CommonModule, AdminModalComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users: any = [];
  showModal: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
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
}
