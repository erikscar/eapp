import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-remove-modal',
  imports: [],
  templateUrl: './remove-modal.component.html',
  styleUrl: './remove-modal.component.scss'
})
export class RemoveModalComponent {
  @Input() itemName!: string;
  @Output() close = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
}
