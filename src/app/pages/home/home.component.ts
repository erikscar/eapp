import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  user: any = {};

  constructor(private userService: UserService) { }

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
  }

}
