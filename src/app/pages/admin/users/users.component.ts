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
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { AdminCrudTableComponent } from "../../../components/admin-crud-table/admin-crud-table.component";
import { AdminToolbarComponent } from "../../../components/admin-toolbar/admin-toolbar.component";
import { AdminTableFooterComponent } from "../../../components/admin-table-footer/admin-table-footer.component";

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
    AdminTableFooterComponent
],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  headers: any = ["Id", "Imagem", "Nome", "Email", "Telefone", "Permissões"]
  columns: any = [
    { key: 'id', type: 'text' },
    { key: 'imageUrl', type: 'image' },
    { key: 'firstName', type: 'text' },
    { key: 'email', type: 'text' },
    { key: 'phone', type: 'text' },
    { key: 'role', type: 'text' },
  ]
  users: any = [];
  usersPaginated: any = [];
  currentPage: number = 1;
  pageSize: number = 5;
  showModal: boolean = false;
  showRemoveModal: boolean = false;
  selectedUserId: number | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  searchForm: FormGroup = new FormGroup({
    searchValue: new FormControl(''),
  });

  getUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        console.log(res);
        this.users = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  toggleRemoveModal(userId: number | null = null): void {
    this.showRemoveModal = !this.showRemoveModal;
    this.selectedUserId = userId
  }

  onUserAdded(): void {
    this.getUsers();
    this.toggleModal();
  }

  get startIndex(): number {
    return this.users.length === 0
      ? 0
      : (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    const end = this.currentPage * this.pageSize;
    return end > this.users.length ? this.users.length : end;
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
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  exportForExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.users);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'usersEApp.xlsx');
  }

  removeUser(userId: number): void {
    this.userService.removeUser(userId).subscribe({
      next: (res) => {
        console.log(res);
        this.getUsers();
        this.toggleRemoveModal();
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
