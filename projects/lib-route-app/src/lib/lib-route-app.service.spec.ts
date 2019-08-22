import { TestBed } from '@angular/core/testing';

import { LibRouteAppService } from './lib-route-app.service';

describe('LibRouteAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LibRouteAppService = TestBed.get(LibRouteAppService);
    expect(service).toBeTruthy();
  });
});
