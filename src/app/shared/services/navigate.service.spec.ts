import { TestBed, inject } from '@angular/core/testing';

import { NavigateService } from './navigate.service';

xdescribe('NavigateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigateService]
    });
  });

  it('should be created', inject([NavigateService], (service: NavigateService) => {
    expect(service).toBeTruthy();
  }));
});
