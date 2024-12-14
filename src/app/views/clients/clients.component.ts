import { Component, OnInit } from '@angular/core';
import { clients } from 'src/app/data/clients';

@Component({
  selector: 'app-client',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientComponent implements OnInit {
  dataClients = clients
  displayedColumns: string[] = ["inscricao", "apelido", "nome", "status"]

  constructor() { }

  ngOnInit(): void {
  }
}
