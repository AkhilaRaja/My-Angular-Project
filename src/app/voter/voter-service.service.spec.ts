import { TestBed } from '@angular/core/testing';

import { VoterServiceService } from './voter-service.service';

describe('VoterServiceService', () => {
  let service: VoterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
