import { LoadingService } from './../loading.service';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-inscricao-evento',
  templateUrl: './inscricao-evento.component.html',
  styleUrls: ['./inscricao-evento.component.css']
})
export class InscricaoEventoComponent implements OnInit {

  public maskRg = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  public maskTelefone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  public maskDataNasc = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  public maskCep = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  public isNew = true;

  public idIntegrante;

  public emailValdio = false;

  public linkImpressao;

  public form: any = {
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

  public funcoes: any[] = [
    {
      id: undefined,
      is_active: undefined,
      nome: undefined,
    }
  ];

  public integrantes: any[] = [
    {
      bairro: undefined,
      cep: undefined,
      cidade: undefined,
      data_nascimento: undefined,
      email: undefined,
      cnpj: undefined,
      endereco: undefined,
      foto: undefined,
      id: undefined,
      is_active: undefined,
      nome: undefined,
      nome_mae: undefined,
      nome_pai: undefined,
      numero: undefined,
      rg: undefined,
      telefone: undefined,
      funcao: undefined
    }
  ];

  public paramId;
  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.paramId = params['id'];
      this.linkImpressao = "/lista-integrantes/"+this.paramId
    });
    this.carregaFuncoes();
    this.carregarIntegrantes();
  }

  carregaFuncoes() {
    this.http.get(`${environment.urlServicos}funcoes/read.php`)
      .map(res => res.json())
      .subscribe((dados) => {
        this.funcoes = dados.records;
      },
      (err) => {
      });
  }

  carregarIntegrantes() {
    this.http.get(`${environment.urlServicos}integrantes/findByIdInscricao.php?id=${this.paramId}`)
      .map(res => res.json())
      .subscribe((dados) => {
        this.integrantes = dados.records;
      },
      (err) => {
      });
  }

  salvarEvento(response) {
    response.value.rg = response.value.rg.replace(/\D/g, '');
    response.value.telefone = response.value.telefone.replace(/\D/g, '');
    response.value.cep = response.value.cep.replace(/\D/g, '');

    response.value.isActive = "1";
    response.value.foto = `${environment.urlImagem}${this.form.rg}.jpg`;
    response.value.idInscricao = this.paramId;
    if (this.isNew) {
      let tmpOpeningDate = response.value.dataNascimento.split('/');
      response.value.dataNascimento = tmpOpeningDate[2] + '-' + tmpOpeningDate[1] + '-' + tmpOpeningDate[0];
      this.http.post(`${environment.urlServicos}integrantes/create.php`, response.value)
        .map(res => res)
        .subscribe(dados => {
          this.carregarIntegrantes();
          this.limpaForm();
          alert('Integrante Adicionado');
        });
    } else {
      response.value.dataNascimento = response.value.dataNascimento.replace('/', '-');
      let tmpOpeningDate = response.value.dataNascimento.split('-');
      response.value.dataNascimento = tmpOpeningDate[2] + '-' + tmpOpeningDate[1] + '-' + tmpOpeningDate[0];
      response.value.id = this.form.id;
      this.http.put(`${environment.urlServicos}integrantes/update.php`, response.value)
        .map(res => res)
        .subscribe(dados => {
          this.carregarIntegrantes();
          this.limpaForm();
          alert('Integrante Adicionado');
        });

      let body = {
        idIntegrante: this.idIntegrante,
        idInscricao: this.paramId,
        funcao: this.form.funcao,
      }

      this.http.post(`${environment.urlServicos}integrantes/createInscricao.php`, body)
        .map(res => res)
        .subscribe(dados => {
          this.carregarIntegrantes();
          this.limpaForm();
        });
    }
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
    this.form.funcao = undefined;
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

  validacaoEmail(field) {
    let usuario = field.substring(0, field.indexOf("@"));
    let dominio = field.substring(field.indexOf("@") + 1, field.length);

    if ((usuario.length >= 1) &&
      (dominio.length >= 3) &&
      (usuario.search("@") == -1) &&
      (dominio.search("@") == -1) &&
      (usuario.search(" ") == -1) &&
      (dominio.search(" ") == -1) &&
      (dominio.search(".") != -1) &&
      (dominio.indexOf(".") >= 1) &&
      (dominio.lastIndexOf(".") < dominio.length - 1)) {
      this.emailValdio = true;
    }
    else {
      this.emailValdio = false;
    }
  }

  buscaIntegranteRg() {
    this.loadingService.addLoading();
    let rg = this.form.rg.replace(/\D/g, '');
    this.http.get(`${environment.urlServicos}integrantes/findByRg.php?rg=${rg}`)
      .map(res => res.json())
      .subscribe((dados) => {
        if (dados.records != undefined) {
          this.isNew = false;
          this.form = dados.records[0];
          this.idIntegrante = dados.records[0].id;
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
    /*     let headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data'); */

    let headers = new Headers();
    headers.set('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let files = event.target.files;

    if (files.length > 0) {
      for (let file of files) {
        if (file.size > 5000000) {
          alert("O tamanho da imagem é muito grande, ela deve ter no máximo 5MB")
        }else{
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

