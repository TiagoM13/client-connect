import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './views/clients/clients.component';
import { ClientComponent } from './views/client/client.component';

const routes: Routes = [
  {
    path: "clients",
    component: ClientsComponent
  },
  {
    path: "clients/:id",
    component: ClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
