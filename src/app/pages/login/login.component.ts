import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    passwordHash: new FormControl("", [Validators.required]),
    rememberme: new FormControl(false)
  })

  login(form: FormGroup) {
    this.userService.login(form.value).subscribe({
      next: (res) => {
        const decodedToken: any = jwtDecode(res.token);
        const role: string = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        if(!form.get('rememberme')?.value) {
          localStorage.setItem('token', res.token);

        } else {
          sessionStorage.setItem('token', res.token);
        }
        
        if(role === "Admin") {
          this.router.navigate(["/admin/dashboard"])
        } else {
          this.router.navigate(["/home"]);
        }
        
        
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
