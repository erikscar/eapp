import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-toolbar',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './admin-toolbar.component.html',
  styleUrl: './admin-toolbar.component.scss'
})
export class AdminToolbarComponent {
  pageSize: number = 5;
  currentPage: number = 1;

  @Input() searchForm!: FormGroup;
  
  @Output() addData = new EventEmitter<void>();
  @Output() exportData = new EventEmitter<void>();
  @Output() searchData = new EventEmitter<void>();
}
