import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import User from '../../interfaces/User';

@Component({
  selector: 'app-admin-crud-table',
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './admin-crud-table.component.html',
  styleUrl: './admin-crud-table.component.scss'
})
export class AdminCrudTableComponent {
[x: string]: any;
  @Input() data: any[] = [];
  @Input() tableHeaders: string[] = [];
  @Input() tableColumns: { key: string, type:string }[] =[]
  @Input() pageSize!: number;
  @Input() currentPage!: number;

  @Output() edit = new EventEmitter<User>();
  @Output() remove = new EventEmitter<number>();
}
