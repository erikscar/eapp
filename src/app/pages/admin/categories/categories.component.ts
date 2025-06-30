import { Component, OnInit } from '@angular/core';
import { AdminToolbarComponent } from '../../../components/admin-toolbar/admin-toolbar.component';
import { AdminCrudTableComponent } from '../../../components/admin-crud-table/admin-crud-table.component';
import { RemoveModalComponent } from '../../../components/modals/remove-modal/remove-modal.component';
import { AdminTableFooterComponent } from '../../../components/admin-table-footer/admin-table-footer.component';
import { Category } from '../../../interfaces/Category';
import { CategoryService } from '../../../services/category/category.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ExcelService } from '../../../services/excel/excel.service';
import { CategoryModalComponent } from "../../../components/modals/category-modal/category-modal.component";

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  imports: [
    AdminToolbarComponent,
    AdminCrudTableComponent,
    RemoveModalComponent,
    AdminTableFooterComponent,
    CategoryModalComponent
],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  headers: any = ['Id', 'Imagem', 'Name', 'Description'];
  columns: any = [
    { key: 'id', type: 'text' },
    { key: 'imageUrl', type: 'image' },
    { key: 'name', type: 'text' },
    { key: 'description', type: 'text' },
  ];
  selectedCategoryId!: number;
  pageSize: number = 5;
  currentPage: number = 1;
  categoryToEdit: Category | null = null;
  showCategoryModal: boolean = false;
  showRemoveModal: boolean = false;
  searchForm: FormGroup = new FormGroup({
    searchValue: new FormControl(''),
  });

  constructor(private categoryService: CategoryService, private toastrService: ToastrService, private excelService: ExcelService) {}

  ngOnInit(): void {
    this.toastrService.info('Categorias Carregadas....');
    this.getCategories();
  }

  onPageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.currentPage = 1;
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
  }

  toggleCategoryModal(): void {
    this.showCategoryModal = !this.showCategoryModal;

    if(!this.showCategoryModal) {
      this.categoryToEdit = null
    }
  }

  toggleRemoveModal(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.showRemoveModal = !this.showRemoveModal;
  }

  onAddedCategory() {
    this.getCategories();
    this.toggleCategoryModal();
  }

  onEditCategory(category: Category): void {
    this.categoryToEdit = category;
    this.toggleCategoryModal();
  }

  onExportCategories(): void {
    this.excelService.exportAsExcelFile(this.categories, "categoriesEapp")
  }

  getCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  searchForCategories(): void {
    const searchValue = this.searchForm.get('searchValue')?.value?.trim();
  
      if (!searchValue) {
        this.getCategories();
        return;
      }

      this.categoryService.getCategoryBySearchValue(searchValue).subscribe({
        next: (res) => {
          this.categories = res
          this.toastrService.info(`Exibindo Resultados para: "${searchValue}"`)
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  removeCategory(): void {
    this.categoryService.removeCategory(this.selectedCategoryId).subscribe({
      next: (res) => {
        console.log(res.message)
        this.getCategories();
        this.showRemoveModal = false;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
