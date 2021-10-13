import { Injectable } from '@angular/core';
import dados from '../models/cidades-estados.json';
import { Estado } from '../models/estado.model';
import { Cidade } from '../models/cidade.model';

@Injectable({
  providedIn: 'root'
})
export class CidadesEstadosService {
  
  constructor() { }

  listarEstados(): Array<Estado> {
    return dados.estados.map((linha: { sigla: string; nome: string; }) => {
      return new Estado(linha.sigla, linha.nome);
    });
  }

  listarCidades(siglaEstado: string): Array<Cidade> {
    return dados.estados.find((linha: { sigla: string; }) => 
        linha.sigla === siglaEstado).cidades;
  }
}
