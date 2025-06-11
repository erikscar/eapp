import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-admin-crud-table',
  imports: [CommonModule],
  templateUrl: './admin-crud-table.component.html',
  styleUrl: './admin-crud-table.component.scss'
})
export class AdminCrudTableComponent {
  @Input() data: any[] = [];
  @Input() tableHeaders: string[] = [];
  @Input() tableColumns: { key: string, type:string }[] =[]

  @Output() edit = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();

}
