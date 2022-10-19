import { NgModule } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TablesComponent } from './components/fields-table/tables.component';
import { FormsComponent } from './components/field-forms/forms.component';
import { FormDComponent } from './components/title-table/form-d.component';
import { DetailTblComponent } from './components/dtls-table/detail-tbl.component';


@NgModule({
  declarations: [
    AppComponent,
    TablesComponent,
    FormsComponent,
    FormDComponent,
    DetailTblComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
