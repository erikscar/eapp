import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { AdminModalComponent } from '../../../components/admin-modal/admin-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminCrudTableComponent } from '../../../components/admin-crud-table/admin-crud-table.component';
import { AdminToolbarComponent } from '../../../components/admin-toolbar/admin-toolbar.component';
import { AdminTableFooterComponent } from '../../../components/admin-table-footer/admin-table-footer.component';
import { ExcelService } from '../../../services/excel.service';

@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModalComponent,
    NgxPaginationModule,
    AdminCrudTableComponent,
    AdminToolbarComponent,
    AdminTableFooterComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  headers: any = ['Id', 'Imagem', 'Nome', 'Email', 'Telefone', 'Permissões'];
  columns: any = [
    { key: 'id', type: 'text' },
    { key: 'imageUrl', type: 'image' },
    { key: 'firstName', type: 'text' },
    { key: 'email', type: 'text' },
    { key: 'phone', type: 'text' },
    { key: 'role', type: 'text' },
  ];
  users: any = [];
  pageSize: number = 5;
  currentPage: number = 1;

  constructor(
    private userService: UserService,
    private router: Router,
    private excelService: ExcelService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  onPageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.currentPage = 1;
  }

  onPageChange(newPage: number){
    this.currentPage = newPage;
  }

  searchForm: FormGroup = new FormGroup({
    searchValue: new FormControl(''),
  });

  getUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onExportUsers() {
    this.excelService.exportAsExcelFile(this.users, 'usersEapp');
  }

  searchForUsers(): void {
    const searchValue = this.searchForm.get('searchValue')?.value?.trim();

    if (!searchValue) {
      this.getUsers();
      return;
    }

    this.userService.getUsersBySearchValue(searchValue).subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeUser(userId: number): void {
    this.userService.removeUser(userId).subscribe({
      next: (res) => {
        this.getUsers();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
