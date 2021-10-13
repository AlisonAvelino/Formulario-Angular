import { Component, OnInit } from '@angular/core';
import { Cidade } from './models/cidade.model';
import { Estado } from './models/estado.model';
import { CidadesEstadosService } from './servicos/cidades-estados.service';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { CpfValidator } from './validadores/cpf.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  estados: Array<Estado> = [];
  cidades: Array<Cidade> = [];

  form: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required,new CpfValidator()]],
    dataNascimento: ['', [Validators.required]],
    senha:['', []],
    estado: ['', [Validators.required]],
    cidade:['', [Validators.required]],
    aceitarContrato:['', [Validators.requiredTrue]],
    linguagem:['', [Validators.required]],
    comentario: ['', []]    
  });

  constructor(private cidadesEstadosService: CidadesEstadosService,
              private fb:FormBuilder){}
  
  ngOnInit(): void {
    this.estados = this.cidadesEstadosService.listarEstados();
    //Carregaria os dados da API
    this.form.controls.nome.setValue('Alison');
    this.form.controls.estado.setValue('SP');
    this.form.controls.cidade.setValue('São Paulo');
    this.cidades = this.cidadesEstadosService.listarCidades('SP');
  }

  listarCidades($event: any) {
    this.form.controls.cidade.setValue("");
    const siglaEstado = $event.target.value;
    if (siglaEstado === '') {
      this.cidades = [];
    } else {
      this.cidades = this.cidadesEstadosService.listarCidades(siglaEstado);
    }
  }
  cadastrar() {
    alert(JSON.stringify(this.form.value));
  }

  emailErrorMsg() {
    const email = this.form.controls.email;
    return email.touched && email.errors;
  }

  errorMsg(campo: string) {
    const control = this.form.controls[campo];
    return control.touched && control.errors;
  }

  cssValidacao(campo: string) {
    const control = this.form.controls[campo];
    if (control.touched) {
      return control.errors ? 'is-invalid' : 'is-valid';
    }
    return '';
  }

  limparFormulario(){
    this.cidades= [];
    this.form.reset;
  }
  
}
