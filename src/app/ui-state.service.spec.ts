import { TestBed } from '@angular/core/testing';

import { UiStateService } from './ui-state.service';

describe('UiStateService', () => {
  
  let service: UiStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.get(UiStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle the help', () => {
    service.helpShown = false;
    service.toggleHelp();
    expect(service.helpShown).toBe(true);
    service.toggleHelp();
    expect(service.helpShown).toBe(false);
  });

  it('should set the help shown variable', () => {
    service.helpShown = false;
    service.setHelpShown(true);
    expect(service.helpShown).toBe(true);
  });

});
