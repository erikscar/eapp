import { Component } from '@angular/core';
import { AdminToolbarComponent } from "../../../components/admin-toolbar/admin-toolbar.component";
import { AdminCrudTableComponent } from "../../../components/admin-crud-table/admin-crud-table.component";
import { RemoveModalComponent } from "../../../components/modals/remove-modal/remove-modal.component";
import { UserModalComponent } from "../../../components/modals/user-modal/user-modal.component";
import { AdminTableFooterComponent } from "../../../components/admin-table-footer/admin-table-footer.component";
import { ExcelService } from '../../../services/excel/excel.service';
import { ProductService } from '../../../services/product/product.service';
import { Product } from '../../../interfaces/Product';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductModalComponent } from "../../../components/modals/product-modal/product-modal.component";

import { Category } from '../../../interfaces/Category';
import { CategoryService } from '../../../services/category/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [AdminToolbarComponent, AdminCrudTableComponent, RemoveModalComponent, AdminTableFooterComponent, ProductModalComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  constructor(private productService: ProductService, private toastrService: ToastrService, private categoryService: CategoryService, private excelService: ExcelService) {}
  headers: any = ['Id', 'Imagem', 'Nome', 'Descrição', 'Preço', 'Oferta'];
  columns: any = [
    { key: 'id', type: 'text' },
    { key: 'imageUrl', type: 'image' },
    { key: 'name', type: 'text' },
    { key: 'description', type: 'text' },
    { key: 'price', type: 'text' },
    { key: 'offer', type: 'text' },
  ];

  products: Product[] = [];
  categories: Category[] = [];
  selectedProductId!: number;
  pageSize: number = 5;
  currentPage: number = 1;
  productToEdit: Product | null = null;
  showProductModal: boolean = false;
  showRemoveModal: boolean = false;
  searchForm: FormGroup = new FormGroup({
    searchValue: new FormControl(''),
  });

    ngOnInit(): void {
      this.toastrService.info('Produtos Carregados....');
      this.getProducts();
      this.getCategories();
    }
  
    onPageSizeChange(newPageSize: number) {
      this.pageSize = newPageSize;
      this.currentPage = 1;
    }
  
    onPageChange(newPage: number) {
      this.currentPage = newPage;
    }
  
    toggleProductModal() {
      this.showProductModal = !this.showProductModal;
  
      if (!this.showProductModal) {
        this.productToEdit = null;
      }
    }
  
    toggleRemoveModal(productId: number) {
      this.selectedProductId = productId;
      this.showRemoveModal = !this.showRemoveModal;
    }
  
    onAddedProduct() {
      this.getProducts();
      this.toggleProductModal();
    }
  
    onEditProduct(product: Product) {
      this.productToEdit = product;
      this.toggleProductModal();
    }
  
    onExportProducts() {
      this.excelService.exportAsExcelFile(this.products, 'productsEapp');
    }
  
    getProducts(): void {
      this.productService.getProducts().subscribe({
        next: (res) => {
          this.products = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }

    getCategories(): void {
      this.categoryService.getAllCategories().subscribe({
        next: (res) => {
          this.categories = res;
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  
    searchForProducts(): void {
      const searchValue = this.searchForm.get('searchValue')?.value?.trim();
  
      if (!searchValue) {
        this.getProducts();
        return;
      }
  
      this.productService.getProductsBySearchValue(searchValue).subscribe({
        next: (res) => {
          this.products = res;
          this.toastrService.info(`Exibindo Resultados para: "${searchValue}"`)
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  
    removeProduct(): void {
      this.productService.removeProduct(this.selectedProductId).subscribe({
        next: (res) => {
          console.log(res.message)
          this.getProducts();
          this.showRemoveModal = false
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
}
