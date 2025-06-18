import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-toolbar',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './admin-toolbar.component.html',
  styleUrl: './admin-toolbar.component.scss',
})
export class AdminToolbarComponent {
  currentPage: number = 1;
  pageSize: number = 5;
  @Input() searchForm!: FormGroup;

  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() addData = new EventEmitter<void>();
  @Output() exportData = new EventEmitter<void>();
  @Output() searchData = new EventEmitter<void>();
}
