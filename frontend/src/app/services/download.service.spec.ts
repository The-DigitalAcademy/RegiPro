import { TestBed } from '@angular/core/testing';

<<<<<<< HEAD:frontend/src/app/services/download.service.spec.ts
import { DownloadService } from './download.service';

describe('DownloadService', () => {
  let service: DownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadService);
=======
import { BusinessPlanService } from './business.service';

describe('BusinessService', () => {
  let service: BusinessPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessPlanService);
>>>>>>> 09fe911e4f2b8555af9954458f39b62de198992c:frontend/src/app/services/business.service.spec.ts
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
