import { TestBed } from '@angular/core/testing';

import { ShedulerService } from './sheduler.service';

describe('ShedulerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShedulerService = TestBed.get(ShedulerService);
    expect(service).toBeTruthy();
  });
});
