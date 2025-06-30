import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../interfaces/Product';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';

import { Category } from '../../../interfaces/Category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss',
})
export class ProductModalComponent {
  @Output() productAdded = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Input() productToEdit: Product | null = null;
  @Input() categories: Category[] | null = null;
  previewImageUrl: string = '';
  addProductForm!: FormGroup;

  constructor(private productService: ProductService, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.addProductForm = new FormGroup({
      imageUrl: new FormControl(""),
      name: new FormControl(""),
      description: new FormControl(""),
      price: new FormControl(""),
      offer: new FormControl(""),
      categoryId: new FormControl(null)
    });

    if (this.productToEdit) {
      this.addProductForm.patchValue(this.productToEdit);
    }
  }

  onSubmit(form: FormGroup) {
    if (this.productToEdit) {
      console.log("ID DA CATEGORIA: " + this.productToEdit.categoryId);
      this.productService
        .adminUpdateProduct(form.value, this.productToEdit.id)
        .subscribe({
          next: () => {
            this.productAdded.emit();
            this.toastrService.success("Produto Atualizado com Sucesso!")
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      this.productService.addProduct(form.value).subscribe({
        next: () => {
          this.productAdded.emit();
          this.toastrService.success("Produto Adicionado com Sucesso!")
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  applyImage(): void {
    const url = this.addProductForm.get('imageUrl')?.value;
    this.previewImageUrl = url;
  }
}
