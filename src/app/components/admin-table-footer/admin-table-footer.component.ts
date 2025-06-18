import { Component, EventEmitter, Output, Input } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-admin-table-footer',
  imports: [NgxPaginationModule],
  templateUrl: './admin-table-footer.component.html',
  styleUrl: './admin-table-footer.component.scss',
})
export class AdminTableFooterComponent {
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 5;
  @Input() totalItems: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  get startIndex(): number {
    return this.totalItems === 0
      ? 0
      : (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    const end = this.currentPage * this.pageSize;
    return end > this.totalItems ? this.totalItems : end;
  }
} 
