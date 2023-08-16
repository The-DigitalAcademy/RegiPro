import { TestBed } from '@angular/core/testing';

import { RegenerateService } from './regenerate.service';

describe('RegenerateService', () => {
  let service: RegenerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegenerateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
