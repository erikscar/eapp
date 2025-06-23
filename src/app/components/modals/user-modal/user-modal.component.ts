import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import User from '../../../interfaces/User';

@Component({
  selector: 'app-user-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss',
})
export class UserModalComponent implements OnInit {
  @Output() userAdded = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Input() userToEdit: User | null = null;
  previewImageUrl: string = '';
  addUserForm!: FormGroup;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      id: new FormControl(null),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      passwordHash: new FormControl(''),
      phone: new FormControl(''),
      role: new FormControl(''),
      imageUrl: new FormControl(''),
    });

    if (this.userToEdit) {
      this.addUserForm.patchValue(this.userToEdit)
    }
  }

  onSubmit(form: FormGroup) {
    if (this.userToEdit) {
      console.log()
      this.userService.adminUpdateUser(form.value, this.userToEdit.id).subscribe({
        next: (res) => {
          console.log(res);
          this.userAdded.emit();
        },
        error: (err) => {
          console.log(err);
        },
      })
    } else {
      this.userService.register(form.value).subscribe({
        next: (res) => {
          console.log(res);
          this.userAdded.emit();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  applyImage(): void {
    const url = this.addUserForm.get('imageUrl')?.value;
    this.previewImageUrl = url;
  }
}
