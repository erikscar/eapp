import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import User from '../../interfaces/User';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    createdAt: ''
  }

  dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  currentDate: string = new Date().toLocaleDateString('pt-BR', this.dateOptions)

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (res) => {
        console.log(res);
        this.user = res;
        this.user.createdAt = new Date(this.user.createdAt).toLocaleDateString('pt-BR', this.dateOptions);
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
}
