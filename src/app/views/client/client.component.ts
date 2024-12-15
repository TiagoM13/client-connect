import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Email } from '@app/services/email/email.model';
import { Categorie, Client } from '@app/services/client/client.model';
import { ClientService } from '@app/services/client/client.service';

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
  categories: Categorie[];

  statusOtions: Option[] = [
    { value: 0, viewValue: 'Desativado' },
    { value: 1, viewValue: 'Ativo' },
    { value: 2, viewValue: 'Suspenso' },
  ]

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.clientService.getClient(id).subscribe(client => {
      this.client = client;
    })
    this.clientService.getEmails().subscribe(emails => {
      this.emails = emails;
    });
    this.clientService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  getEmails(client: Client): Email[] {
    return client.emails.map(emailId => this.emails.find(email => email.id === emailId));
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.nome : 'Categoria não encontrada';
  }

  deleteClient(): void {
    this.clientService.deleteClient(this.client.id).subscribe(() => {
      this.clientService.showMessage('Cliente deletado com sucesso!')
      this.router.navigate(['/clients'])
    })
  }

  updateClient(): void {
    this.clientService.updateClient(this.client).subscribe(() => {
      this.clientService.showMessage('Cliente atualizado com sucesso!')
      this.router.navigate(['/clients'])
    })
  }

  getEmail(email: Email): void {
    console.log(email)
  }

  onCancel(): void {
    this.router.navigate(["/clients"])
  }
}
