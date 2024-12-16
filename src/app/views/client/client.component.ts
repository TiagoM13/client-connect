import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { DialogEmailComponent } from '@app/components/dialog-email/dialog-email.component';
import { DialogCategoryComponent } from '@app/components/dialog-category/dialog-category.component';
import { ActionType } from '@app/components/dialog-email/dialog-email.model';
import { Email } from '@app/services/email/email.model';
import { Client } from '@app/services/client/client.model';
import { Category } from '@app/services/category/category.model';
import { ClientService } from '@app/services/client/client.service';
import { EmailService } from '@app/services/email/email.service';
import { CategoryService } from '@app/services/category/category.service';

interface Option {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  client: Client;
  emails: Email[];
  categories: Category[];
  isDeleteEmail: boolean = false;

  private temporarilyRemovedEmails: string[] = [];

  statusOtions: Option[] = [
    { value: 0, viewValue: 'Desativado' },
    { value: 1, viewValue: 'Ativo' },
    { value: 2, viewValue: 'Suspenso' },
  ]

  constructor(
    private clientService: ClientService,
    private categoryService: CategoryService,
    private emailService: EmailService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.onLoad()
  }

  onLoad(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.clientService.getClient(id).subscribe(client => {
      this.client = client;
    })
    this.emailService.getAllEmails().subscribe(emails => {
      this.emails = emails;
    });
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  getEmails(client: Client): Email[] {
    return client.emails.map(emailId => this.emails.find(email => email.id === emailId));
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.nome : 'Categoria não encontrada';
  }

  deleteClient(): void {
    this.clientService.deleteClient(this.client.id).subscribe(() => {
      this.clientService.showMessage('Cliente deletado com sucesso!')
      this.router.navigate(['/clients'])
    })
  }

  saveClient(): void {
    if (this.temporarilyRemovedEmails.length > 0) {
      this.temporarilyRemovedEmails.map(id => this.emailService.deleteEmail(id))
    }

    this.clientService.updateClient(this.client).subscribe(() => {
      this.clientService.showMessage('Cliente atualizado com sucesso!');
      this.router.navigate(['/clients']);
      this.temporarilyRemovedEmails = [];
    });
  }

  openEmailDialog(action: ActionType, email?: Email): void {
    this.isDeleteEmail = action === 'delete';

    if (action === 'update' && email) {
      this.emailService.getEmail(email.id).subscribe((emailDetails) => {
        this.openDialogWithData(action, emailDetails);
      });
    } else {
      this.openDialogWithData(action, email);
    }
  }

  openDialogWithData(action: ActionType, email?: Email): void {
    const dialogRef = this.dialog.open(DialogEmailComponent, {
      width: '400px',
      data: {
        action,
        data: email,
        categories: this.categories,
        isDisabled: this.isDeleteEmail
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      const { action, data } = result;

      if (action === 'create' && (!data || !this.isValidEmail(data))) {
        return;
      };

      if (action === 'create') this.addEmail(data);
      if (action === 'update') this.updateEmail(data);
      if (action === 'delete') this.removeEmail(data);

      this.categoryService.getAllCategories().subscribe(categories => {
        this.categories = categories;
      });
    });
  }

  isValidEmail(data: Email): boolean {
    if (!data.email || data.email.trim() === '') return false;
    if (!data.nome || data.nome.trim() === '') return false;
    if (!data.categoria || data.categoria === null) return false
    return true;
  }

  addEmail(newEmail: Email): void {
    this.emailService.createEmail(newEmail).subscribe(email => {
      this.client.emails.push(email.id);
      this.emails.push(email);
    });
  }

  updateEmail(updatedEmail: Email): void {
    this.emailService.updateEmail(updatedEmail).subscribe(() => {
      const index = this.emails.findIndex(email => email.id === updatedEmail.id);
      if (index - 1) this.emails[index] = updatedEmail;
      this.clientService.showMessage('Email atualizado com sucesso!')
    })
  }

  removeEmail(deleteEmail: Email): void {
    this.temporarilyRemovedEmails.push(deleteEmail.id);
    this.client.emails = this.client.emails.filter(id => id !== deleteEmail.id);
    this.emails = this.emails.filter(email => email.id !== deleteEmail.id);
  }

  goback(): void {
    this.router.navigate(["/clients"])
  }

  openCategoryDialog() {
    const dialogRef = this.dialog.open(DialogCategoryComponent, {
      width: "600px",
      data: {
        categories: this.categories
      }
    })

    dialogRef.afterClosed().subscribe(() => {
      this.categoryService.getAllCategories().subscribe(categories => {
        this.categories = categories;
      });
    })
  }
}
