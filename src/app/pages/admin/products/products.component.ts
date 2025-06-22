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

@Component({
  selector: 'app-products',
  imports: [AdminToolbarComponent, AdminCrudTableComponent, RemoveModalComponent, UserModalComponent, AdminTableFooterComponent, ProductModalComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  constructor(private productService: ProductService,private excelService: ExcelService) {}
  headers: any = ['Id', 'Imagem', 'Nome', 'Email', 'Telefone', 'Permissões'];
  columns: any = [
    { key: 'id', type: 'text' },
    { key: 'imageUrl', type: 'image' },
    { key: 'firstName', type: 'text' },
    { key: 'email', type: 'text' },
    { key: 'phone', type: 'text' },
    { key: 'role', type: 'text' },
  ];
  products: Product[] = [];
  selectedUserId!: number;
  pageSize: number = 5;
  currentPage: number = 1;
  productToEdit: Product | null = null;
  showUserModal: boolean = false;
  showRemoveModal: boolean = false;
  searchForm: FormGroup = new FormGroup({
    searchValue: new FormControl(''),
  });

    ngOnInit(): void {
      this.getProducts();
    }
  
    onPageSizeChange(newPageSize: number) {
      this.pageSize = newPageSize;
      this.currentPage = 1;
    }
  
    onPageChange(newPage: number) {
      this.currentPage = newPage;
    }
  
    toggleUserModal() {
      this.showUserModal = !this.showUserModal;
  
      if (!this.showUserModal) {
        this.productToEdit = null;
      }
    }
  
    toggleRemoveModal(userId: number) {
      this.selectedUserId = userId;
      this.showRemoveModal = !this.showRemoveModal;
    }
  
    onAddedProduct() {
      this.getProducts();
      this.toggleUserModal();
    }
  
    onEditProduct(product: Product) {
      this.productToEdit = product;
      this.toggleUserModal();
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
  
    searchForProducts(): void {
      const searchValue = this.searchForm.get('searchValue')?.value?.trim();
  
      if (!searchValue) {
        this.getProducts();
        return;
      }
  
      this.productService.getProductsBySearchValue(searchValue).subscribe({
        next: (res) => {
          this.products = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  
    removeProduct(): void {
      this.productService.removeProduct(this.selectedUserId).subscribe({
        next: () => {
          this.getProducts();
          this.showRemoveModal = false
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
}
