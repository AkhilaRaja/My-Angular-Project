import { TestBed } from '@angular/core/testing';

import { LocalbodyServiceService } from './localbody-service.service';

describe('LocalbodyServiceService', () => {
  let service: LocalbodyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalbodyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
