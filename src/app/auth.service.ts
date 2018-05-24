import { Http } from '@angular/http';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';
import { Usuario } from './usuario';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  public autenticado = false;
  public corporacao = {
    id: undefined,
    is_acive: undefined,
    nome: undefined,
    usuario: undefined,
    senha: undefined,
    mantenedora: undefined,
    cnpj: undefined,
    nome_responsavel_mantenedora: undefined,
    endereco: undefined,
    bairro: undefined,
    cidade: undefined,
    cep: undefined,
    coordenador: undefined,
    tel_coordenador: undefined,
    regente: undefined,
    telefone_regente: undefined
  }

  constructor(
    private router: Router,
    private http: Http
  ) { }

  fazerLogin(resposta) {

    this.http.get(`${environment.urlServicos}corporacoes/findByUser.php?user=${resposta.usuario}`)
    .map(res => res.json())
    .subscribe((dados) => {
      this.corporacao = dados.records;
      this.autentica(resposta)
    },
    (err) => {
      alert('Usuário ou senha Inválidos')
    });

  }

  autentica(resposta){
    if ((resposta.usuario === this.corporacao[0].usuario) && (resposta.senha === this.corporacao[0].senha )) {
      this.autenticado = true;
      this.router.navigate(['eventos'])
    } else {
      this.autenticado = false;
      alert('Usuário ou senha Inválidos')
    }
  }

  getCorporacao(){
    return this.corporacao[0]
  }

  setAutenticado(value){
    this.autenticado = value
  }

}
