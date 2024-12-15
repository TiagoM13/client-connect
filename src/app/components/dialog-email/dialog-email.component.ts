import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActionType, DialogData } from './dialog-email.model';

interface Option {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-email',
  templateUrl: './dialog-email.component.html',
  styleUrls: ['./dialog-email.component.scss']
})
export class DialogEmailComponent {
  title: string
  data: any;
  categories: Option[]
  isDisabled: boolean = false

  constructor(
    public dialogRef: MatDialogRef<DialogEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData
  ) {
    this.title = this.getDialogTitle(dialogData.action)
    this.data = dialogData.data || { nome: '', email: '', categoria: null }
    this.categories = this.dialogData.categories.map((category => ({ value: category.id, viewValue: category.nome })));
    this.isDisabled = this.dialogData.isDisabled;
  }

  getDialogTitle(action: ActionType): string {
    switch (action) {
      case 'create': return 'Adicionar email';
      case 'update': return 'Atualizar email';
      case 'delete': return 'Excluir email';
      default: return '';
    }
  }

  onSubmit(): void {
    this.dialogRef.close({ action: this.dialogData.action, data: this.data })
  }

  close(): void {
    this.dialogRef.close(null)
  }
}
