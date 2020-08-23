import { TestBed } from '@angular/core/testing';

import { PollingstationServiceService } from './pollingstation-service.service';

describe('PollingstationServiceService', () => {
  let service: PollingstationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollingstationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
