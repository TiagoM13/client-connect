import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from "@angular/material/card"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatTableModule } from "@angular/material/table"
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/template/header/header.component';
import { ClientsComponent } from './views/clients/clients.component';
import { ClientComponent } from './views/client/client.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientsComponent,
    ClientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
