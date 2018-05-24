import { LoadingService } from './loading.service';
import { AuthService } from './auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ImageUploadModule } from "angular2-image-upload";

import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './routes';
import { InscricaoEventoComponent } from './inscricao-evento/inscricao-evento.component';
import { HomeComponent } from './home/home.component';
import { TextMaskModule } from 'angular2-text-mask';
import { LoadingComponent } from './loading/loading.component';
import { IntegranteFormComponent } from './integrante-form/integrante-form.component';
import { ListaIntegrantesComponent } from './lista-integrantes/lista-integrantes.component';
import { HeaderComponent } from './header/header.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    EventosComponent,
    InscricaoEventoComponent,
    HomeComponent,
    LoadingComponent,
    IntegranteFormComponent,
    ListaIntegrantesComponent,
    HeaderComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    TextMaskModule,
    ImageUploadModule.forRoot(),
  ],
  providers: [AuthService, LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
