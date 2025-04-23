import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private userService: UserService) {}

  registerForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    passwordHash: new FormControl("", [Validators.required]),
    confirmPassword: new FormControl("", [Validators.required])
  })

  register(form: FormGroup) {
    this.userService.register(form.value).subscribe({
      next: (res) => {
        console.log("Usuário Registrado com Sucesso: ", res);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
