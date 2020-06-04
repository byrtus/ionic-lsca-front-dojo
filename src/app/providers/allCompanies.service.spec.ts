import { TestBed } from '@angular/core/testing';

import { AllCompaniesService } from './allCompanies.service';

describe('All.CompaniesService', () => {
  let service: AllCompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllCompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
