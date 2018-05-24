import { LoadingService } from './../loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-integrante-form',
  templateUrl: './integrante-form.component.html',
  styleUrls: ['./integrante-form.component.css']
})
export class IntegranteFormComponent implements OnInit {

  public maskRg = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  
    public maskTelefone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  
    public maskDataNasc = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  
    public maskCep = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  public form: any = {
    id: undefined,
    rg: undefined,
    nome: undefined,
    telefone: undefined,
    cep: undefined,
    endereco: undefined,
    numero: undefined,
    bairro: undefined,
    cidade: undefined,
    dataNascimento: undefined,
    nomePai: undefined,
    nomeMae: undefined,
    email: undefined,
    telefoneRegente: undefined,
    foto: undefined
  }
  public paramId;
  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.paramId = params['rg'];
      this.buscaIntegranteRg(this.paramId);
    });
  }

  salvarIntegrante(response) {
    response.value.rg = response.value.rg.replace(/\D/g, '');
    response.value.telefone = response.value.telefone.replace(/\D/g, '');
    response.value.cep = response.value.cep.replace(/\D/g, '');

    response.value.isActive = "1";
    response.value.foto = `${environment.urlImagem}${this.form.rg}.jpg`;

    response.value.dataNascimento = response.value.dataNascimento.replace('/', '-');
    let tmpOpeningDate = response.value.dataNascimento.split('-');
    response.value.dataNascimento = tmpOpeningDate[2] + '-' + tmpOpeningDate[1] + '-' + tmpOpeningDate[0];
    response.value.id = this.form.id;
    this.http.put(`${environment.urlServicos}integrantes/update.php`, response.value)
      .map(res => res)
      .subscribe(dados => {
        this.limpaForm();
        this.router.navigate(['eventos'])
        alert('Integrante Alterado');
      });

  }

  limpaForm() {
    this.form.rg = undefined;
    this.form.nome = undefined;
    this.form.telefone = undefined;
    this.form.cep = undefined;
    this.form.endereco = undefined;
    this.form.numero = undefined;
    this.form.bairro = undefined;
    this.form.cidade = undefined;
    this.form.dataNascimento = undefined;
    this.form.nomePai = undefined;
    this.form.nomeMae = undefined;
    this.form.email = undefined;
    this.form.telefoneRegente = undefined;
  }

  consultaCep(cep) {
    cep = cep.replace(/\D/g, '');

    if (cep != "") {
      var validaCep = /^[0-9]{8}$/;

      if (validaCep.test(cep)) {
        this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .map(res => res.json())
          .subscribe(dados => {
            this.form.endereco = dados.logradouro;
            this.form.bairro = dados.bairro;
            this.form.cidade = dados.localidade;

          }
          );
      }
    }
  }


  buscaIntegranteRg(rg) {
    this.loadingService.addLoading();
    
    this.http.get(`${environment.urlServicos}integrantes/findByRg.php?rg=${rg}`)
      .map(res => res.json())
      .subscribe((dados) => {
        if (dados.records != undefined) {
          this.form = dados.records[0];
          this.form.id = dados.records[0].id;
          this.form.nomePai = dados.records[0].nome_pai;
          this.form.nomeMae = dados.records[0].nome_mae;
          this.form.dataNascimento = dados.records[0].data_nascimento;
          let tmpOpeningDate = this.form.dataNascimento.split('-');
          this.form.dataNascimento = tmpOpeningDate[2] + '-' + tmpOpeningDate[1] + '-' + tmpOpeningDate[0];
        }
        this.loadingService.hideLoading();

      },
      (err) => {
        this.loadingService.hideLoading();
      });
  }

  uploadImagem(event) {
    let formData: FormData = new FormData();

    let headers = new Headers();
    headers.set('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let files = event.target.files;

    if (files.length > 0) {
      for (let file of files) {
        if (file.size > 5000000) {
          alert("O tamanho da imagem é muito grande, ela deve ter no máximo 5MB")
        } else {
          if (file.type == "image/jpeg") {
            formData.append('file', file, `${this.form.rg}.jpg`);
          }
        }
      }

      this.http.post(`${environment.urlServicos}integrantes/uploadImagem.php`, formData, options)
        .map(res => res)
        .subscribe(dados => {
        });
    }


  }

}
