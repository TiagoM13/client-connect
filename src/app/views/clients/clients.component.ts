import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Client, Status } from 'src/app/services/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients: Client[] = []
  @ViewChild(MatPaginator) paginator: MatPaginator

  displayedColumns: string[] = ["inscricao", "apelido", "nome", "status"]
  dataClients = new MatTableDataSource<Client>();

  constructor(
    private router: Router,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe(clients => {
      this.clients = clients
      this.dataClients = new MatTableDataSource<Client>(this.clients);
      this.dataClients.paginator = this.paginator
    })
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

  onNavigate(client: Client): void {
    this.router.navigate([`/clients/${client.id}`]);
  }
}
