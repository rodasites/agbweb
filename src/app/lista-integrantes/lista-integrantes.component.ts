import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-lista-integrantes',
  templateUrl: './lista-integrantes.component.html',
  styleUrls: ['./lista-integrantes.component.css']
})
export class ListaIntegrantesComponent implements OnInit {

  private date = new Date();

  public dataHora = this.date.getDate() +"/"+ (this.date.getMonth()+1) +"/"+ this.date.getFullYear() +" -   "+ this.date.getHours() +":"+ this.date.getMinutes()+"h";

  private paramId;

  public integrantes: any[] = [
    {
      data_nascimento: undefined,
      id: undefined,
      nome: undefined,
      rg: undefined,
      telefone: undefined,
      funcao: undefined
    }
  ];

  constructor(
    private http: Http,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.paramId = params['id'];
      this.carregarIntegrantes();
    });
  }

  carregarIntegrantes() {
    this.http.get(`${environment.urlServicos}integrantes/findByIdInscricao.php?id=${this.paramId}`)
      .map(res => res.json())
      .subscribe((dados) => {
        this.integrantes = dados.records;
        for (var index = 0; index < dados.records.length; index++) {
          this.integrantes[index].data_nascimento = dados.records[index].data_nascimento;
          let tmpOpeningDate = this.integrantes[index].data_nascimento.split('-');
          this.integrantes[index].data_nascimento = tmpOpeningDate[2] + '/' + tmpOpeningDate[1] + '/' + tmpOpeningDate[0];
        }
      },
      (err) => {
      });
  }

  imprimir(){
    window.print();
  }
}
