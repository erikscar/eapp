import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-modal.component.html',
  styleUrl: './admin-modal.component.scss'
})
export class AdminModalComponent {
  @Output() userAdded = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  previewImageUrl: string = "";

  constructor(private userService: UserService) {}
  
  addUserForm: FormGroup = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
    passwordHash: new FormControl(""),
    phone: new FormControl(""),
    role: new FormControl(""),
    imageUrl: new FormControl("")
  })

  addUser(form: FormGroup): void {
    this.userService.register(form.value).subscribe({
      next: (res) => {
        console.log(res);
        this.userAdded.emit();
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  applyImage(): void {
    const url = this.addUserForm.get('imageUrl')?.value
    this.previewImageUrl = url
  }

  closeModal(): void {
    this.close.emit()
  }
}
