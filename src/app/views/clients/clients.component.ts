import { Component, OnInit, ViewChild } from '@angular/core';
import { clients } from 'src/app/data/clients';
import { Client, Status } from './clients.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-client',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientComponent implements OnInit {
  displayedColumns: string[] = ["inscricao", "apelido", "nome", "status"]
  dataClients = new MatTableDataSource<Client>(clients)

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator

  constructor() { }

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
}
