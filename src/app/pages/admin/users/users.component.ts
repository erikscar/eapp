import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AdminCrudTableComponent } from '../../../components/admin-crud-table/admin-crud-table.component';
import { AdminToolbarComponent } from '../../../components/admin-toolbar/admin-toolbar.component';
import { AdminTableFooterComponent } from '../../../components/admin-table-footer/admin-table-footer.component';
import { ExcelService } from '../../../services/excel/excel.service';
import { UserModalComponent } from "../../../components/modals/user-modal/user-modal.component";
import { RemoveModalComponent } from "../../../components/modals/remove-modal/remove-modal.component";
import User from '../../../interfaces/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AdminCrudTableComponent,
    AdminToolbarComponent,
    AdminTableFooterComponent,
    UserModalComponent,
    RemoveModalComponent
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
  selectedUserId!: number;
  pageSize: number = 5;
  currentPage: number = 1;
  userToEdit: User | null = null;
  showUserModal: boolean = false;
  showRemoveModal: boolean = false;
  searchForm: FormGroup = new FormGroup({
    searchValue: new FormControl(''),
  });

  constructor(private toastrService: ToastrService, private userService: UserService, private excelService: ExcelService) { }

  ngOnInit(): void {
    this.getUsers();
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
      this.userToEdit = null;
    }
  }

  toggleRemoveModal(userId: number) {
    this.selectedUserId = userId;
    this.showRemoveModal = !this.showRemoveModal;
  }

  onAddedUser() {
    this.getUsers();
    this.toggleUserModal();
  }

  onEditUser(user: User) {
    this.userToEdit = user;
    this.toggleUserModal();
  }

  onExportUsers() {
    this.excelService.exportAsExcelFile(this.users, 'usersEapp');
  }

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

  removeUser(): void {
    this.userService.removeUser(this.selectedUserId).subscribe({
      next: (res) => {
        this.getUsers();
        this.showRemoveModal = false
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  show() {
    this.toastrService.warning('Abacate')
  }
}

