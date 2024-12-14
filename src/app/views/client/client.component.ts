import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie, Client, Email, Status } from 'src/app/services/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  client: Client;
  emails: Email[];
  categories: Categorie[];

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

  getStatusText(status: Status): string {
    switch (status) {
      case Status.DESATIVADO:
        return 'DESATIVADO';
      case Status.ATIVO:
        return 'ATIVO';
      case Status.SUSPENSO:
        return 'SUSPENSO';
      default:
        return '';
    }
  }

  deleteClient(): void {
    this.clientService.deleteClient(this.client.id).subscribe(() => {
      this.clientService.showMessage('Cliente deletado com sucesso!')
      this.router.navigate(['/clients'])
    })
  }

  onCancel(): void {
    this.router.navigate(["/clients"])
  }
}
