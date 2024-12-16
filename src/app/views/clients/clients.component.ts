import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { Client, Status } from '@app/services/client/client.model';
import { ClientService } from '@app/services/client/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, AfterViewInit {
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
      this.dataClients.data = clients
    })
  }

  ngAfterViewInit(): void {
    this.dataClients.paginator = this.paginator
  }

  getStatusText(status: Status): string {
    switch (status) {
      case Status.DESATIVADO:
        return 'Desativado';
      case Status.ATIVO:
        return 'Ativo';
      case Status.SUSPENSO:
        return 'Suspenso';
      default:
        return '';
    }
  }

  onNavigate(client: Client): void {
    this.router.navigate([`/clients/${client.id}`]);
  }
}
