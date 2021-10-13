import { TestBed } from '@angular/core/testing';

import { CidadesEstadosService } from './cidades-estados.service';

describe('CidadesEstadosService', () => {
  let service: CidadesEstadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CidadesEstadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
