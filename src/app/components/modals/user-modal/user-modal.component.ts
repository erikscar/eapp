import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import User from '../../../interfaces/User';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private userService: UserService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
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
        next: () => {
          this.userAdded.emit();
          this.toastrService.success("Usuário Atualizado com Sucesso!")
        },
        error: (err) => {
          console.log(err);
        },
      })
    } else {
      this.userService.register(form.value).subscribe({
        next: () => {
          this.userAdded.emit();
          this.toastrService.success("Usuário Adicionado com Sucesso!")
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
