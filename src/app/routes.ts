import { LogoutComponent } from './logout/logout.component';
import { ListaIntegrantesComponent } from './lista-integrantes/lista-integrantes.component';
import { IntegranteFormComponent } from './integrante-form/integrante-form.component';
import { HomeComponent } from './home/home.component';
import { EventosComponent } from './eventos/eventos.component';
import { InscricaoEventoComponent } from './inscricao-evento/inscricao-evento.component';

export const appRoutes = [
    {path: '', redirectTo: 'home/', pathMatch: 'full'},
    {path: 'home/', component: HomeComponent},
    {path: 'eventos', component: EventosComponent},
    {path: 'eventos/:id', component: EventosComponent},
    {path: 'inscricao-evento/:id', component: InscricaoEventoComponent},
    {path: 'integrante-form/:rg', component: IntegranteFormComponent},
    {path: 'lista-integrantes/:id', component: ListaIntegrantesComponent},
    {path: 'logout', component: LogoutComponent},
];
