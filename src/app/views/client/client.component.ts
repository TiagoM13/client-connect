import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client, Status } from '../clients/clients.model';
import { clients } from 'src/app/data/clients';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  client: Client | undefined = undefined;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.client = clients[+params.get('id')]
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

  onCancel(): void {
    this.router.navigate(["/clients"])
  }
}
