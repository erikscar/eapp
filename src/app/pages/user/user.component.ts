import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import User from '../../interfaces/User';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})

export class UserComponent implements OnInit {
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    createdAt: '',
    phone: '',
    profileImageUrl: ''
  }

  dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  currentDate: string = new Date().toLocaleDateString('pt-BR', this.dateOptions)

  constructor(private userService: UserService, private router: Router) {}
  updateForm!: FormGroup;

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      passwordHash: new FormControl('••••••'),
      confirmPassword: new FormControl('••••••'),
    }, { validators: this.passwordMismatchValidator });

    this.userService.getUser().subscribe({
      next: (res) => {
        this.user = res;
        this.user.createdAt = new Date(this.user.createdAt).toLocaleDateString('pt-BR', this.dateOptions);

        this.updateForm.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          phone: 321321,
          passwordHash: "",
          confirmPassword: "",
        })
      },
      error: (err) => {
        console.log(err)
      },
    })
  }

  updateUser(updateForm: FormGroup){
    console.log(updateForm.value);
    this.userService.updateUser(updateForm.value).subscribe({
      next: () => {
        this.router.navigate(["/home"])
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  passwordMismatchValidator(control: AbstractControl) : ValidationErrors | null {
    return control.get("passwordHash")?.value !== control.get("confirmPassword")?.value ? { missmatch: true} : null;
  }
}
