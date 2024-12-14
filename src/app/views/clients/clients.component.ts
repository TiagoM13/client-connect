import { Component, OnInit, ViewChild } from '@angular/core';
import { clients } from 'src/app/data/clients';
import { Client, Status } from './clients.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator

  displayedColumns: string[] = ["inscricao", "apelido", "nome", "status"]
  dataClients = new MatTableDataSource<Client>(clients)

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.dataClients.paginator = this.paginator
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
    this.router.navigate([`/clients/${client.id}`])
  }
}
