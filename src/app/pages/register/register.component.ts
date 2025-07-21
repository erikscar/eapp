
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) {}

  registerForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    passwordHash: new FormControl("", [Validators.required]),
    confirmPassword: new FormControl("", [Validators.required])
  }, { validators: this.passwordMismatchValidator})

  register(form: FormGroup) {
    this.userService.register(form.value).subscribe({
      next: (res) => {
        console.log("Usuário Registrado com Sucesso: ", res);
        sessionStorage.setItem('token', res.token);
        this.router.navigate(["/home"]);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  passwordMismatchValidator(control: AbstractControl) : ValidationErrors | null {
    return control.get("passwordHash")?.value !== control.get("confirmPassword")?.value ? { missmatch: true} : null;
  }
}
