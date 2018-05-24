import { AuthService } from './../auth.service';
import { Http, Headers } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  
  public eventos: any[] = [
    {
      id: undefined,
      evento: undefined,
      data: undefined,
      categoria: undefined,

    }
  ];

  constructor(
    private http: Http,
    private authService: AuthService,
    private router: Router)
   { }

  ngOnInit() {

    this.carregaEventos();
  }

  carregaEventos() {
    if (this.authService.autenticado)
    {
    this.http.get(`${environment.urlServicos}inscricoes/findByIdCorporacao.php?id=${this.authService.corporacao[0].id}`)
      .map(res => res.json())
      .subscribe((dados) => {
        this.eventos = dados.records;
        console.log(this.eventos)
      },
      (err) => {
      });
    }else{
      this.router.navigateByUrl(`home/`)
    }
  }

}
