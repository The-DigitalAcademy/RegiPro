import { TestBed } from '@angular/core/testing';

import { TokeStorageService } from './toke-storage.service';

describe('TokeStorageService', () => {
  let service: TokeStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokeStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
