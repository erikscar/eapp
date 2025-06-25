import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../../interfaces/Category';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-category-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.scss'
})
export class CategoryModalComponent {
  @Output() categoryAdded = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Input() categoryToEdit: Category | null = null;
  previewImageUrl: string = '';
  addCategoryForm!: FormGroup;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.addCategoryForm = new FormGroup({
      name: new FormControl(""),
      description: new FormControl(""),
      imageUrl: new FormControl(""),
    });

    if (this.categoryToEdit) {
      this.addCategoryForm.patchValue(this.categoryToEdit);
    }
  }

  onSubmit(form: FormGroup) {
    if (this.categoryToEdit) {
      this.categoryService
        .adminUpdateCategory(form.value, this.categoryToEdit.id)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.categoryAdded.emit();
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      this.categoryService.addCategory(form.value).subscribe({
        next: (res) => {
          console.log(res);
          this.categoryAdded.emit();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  applyImage(): void {
    const url = this.addCategoryForm.get('imageUrl')?.value;
    this.previewImageUrl = url;
  }
}
