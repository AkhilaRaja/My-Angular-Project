import { TestBed } from '@angular/core/testing';

import { WardServiceService } from './ward-service.service';

describe('WardServiceService', () => {
  let service: WardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
