import { TestBed } from '@angular/core/testing';

import { ReligionServiceService } from './religion-service.service';

describe('ReligionServiceService', () => {
  let service: ReligionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReligionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
