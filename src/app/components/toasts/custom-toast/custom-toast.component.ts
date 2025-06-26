import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-custom-toast',
  imports: [CommonModule],
  templateUrl: './custom-toast.component.html',
  styleUrl: './custom-toast.component.scss',
})
export class CustomToastComponent extends Toast {
    defaultTitle: string = "";
  constructor(toastrService: ToastrService, toastPackage: ToastPackage) {
    super(toastrService, toastPackage)

    const type = toastPackage.toastType;

    this.defaultTitle = toastPackage.title || this.getDefaultTitle(type);
  }

  get iconClass(): string {
    switch(this.toastPackage.toastType) {
      case 'toast-success': return 'fa-circle-check';
      case 'toast-error': return 'fa-circle-xmark';
      case 'toast-info': return 'fa-circle-info';
      case 'toast-warning': return 'fa-circle-exclamation';
      default: return ""
    }
  }

   getDefaultTitle(type: string): string {
    switch (type) {
      case 'toast-success': return 'Sucesso';
      case 'toast-error': return 'Erro';
      case 'toast-info': return 'Aviso';
      case 'toast-warning': return 'Atenção';
      default: return '';
    }
  }
}
