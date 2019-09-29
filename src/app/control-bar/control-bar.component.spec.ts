import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlBarComponent } from './control-bar.component';
import { TrainService } from '../train.service';
import { Observable, of } from 'rxjs';
import { DarkModeService } from '../dark-mode.service';
import { UiStateService } from '../ui-state.service';

describe('ControlBarComponent', () => {
  let component: ControlBarComponent;
  let fixture: ComponentFixture<ControlBarComponent>;

  beforeEach(async(() => {
    const trainServiceSpy = jasmine.createSpyObj('TrainService', ['getTrains', 'discoverTrain', 'shutdownBluetooth', 'stopAll', 'connectAll', 'disconnectAll']);
   
    trainServiceSpy.discoverTrain.and.returnValue(of('1'));

    const stubValue = new Observable<void>();
    trainServiceSpy.shutdownBluetooth.and.returnValue(stubValue);
    trainServiceSpy.getTrains.and.returnValue(stubValue);
    trainServiceSpy.stopAll.and.returnValue(stubValue);
    trainServiceSpy.connectAll.and.returnValue(stubValue);
    trainServiceSpy.disconnectAll.and.returnValue(stubValue);

    const darkModeServiceSpy: jasmine.SpyObj<DarkModeService> = jasmine.createSpyObj('DarkModeService', ['nothing']);
    darkModeServiceSpy.active = false;

    const uiStateServiceSpy: jasmine.SpyObj<UiStateService> = jasmine.createSpyObj('UiStateService', ['toggleHelp']);

    TestBed.configureTestingModule({
      declarations: [ ControlBarComponent ],
      providers: [
        {provide: TrainService, useValue: trainServiceSpy}, 
        {provide: DarkModeService, useValue: darkModeServiceSpy}, 
        {provide: UiStateService, useValue: uiStateServiceSpy}, 
      ]
    })
    .compileComponents();
  }));

  let trainServiceSpy: jasmine.SpyObj<TrainService>;
  let darkModeServiceSpy: jasmine.SpyObj<DarkModeService>;
  let uiStateServiceSpy: jasmine.SpyObj<UiStateService>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlBarComponent);
    component = fixture.componentInstance;
    trainServiceSpy = TestBed.get(TrainService);
    darkModeServiceSpy = TestBed.get(DarkModeService);
    uiStateServiceSpy = TestBed.get(UiStateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should discover', () => {
    component.onDiscover();
    expect(component.discovery).toBe(true);
    expect(trainServiceSpy.discoverTrain.calls.count()).toBe(1);

    trainServiceSpy.discoverTrain.and.returnValue(of('0'));
    component.onDiscover();
    expect(component.discovery).toBe(false);
    expect(trainServiceSpy.discoverTrain.calls.count()).toBe(2);
  });

  it('should connect all', () => {
    component.connectAllTrains();
    expect(trainServiceSpy.connectAll.calls.count()).toBe(1);
  });
  
  it('should disonnect all', () => {
    component.disconnectAllTrains();
    expect(trainServiceSpy.disconnectAll.calls.count()).toBe(1);
  });
  
  it('should stop all', () => {
    component.stopAllTrains();
    expect(trainServiceSpy.stopAll.calls.count()).toBe(1);
  });

  it('should shutdown bluetooth', () => {
    component.shutdownBluetooth();
    expect(trainServiceSpy.shutdownBluetooth.calls.count()).toBe(1);
  });

  it('should switch dark mode on and off', () => {
    expect(darkModeServiceSpy.active).toBe(false);
    component.onDarkModeSwitch();
    expect(darkModeServiceSpy.active).toBe(true);
    component.onDarkModeSwitch();
    expect(darkModeServiceSpy.active).toBe(false);
  });

  it('should toggle the help', () => {
    component.onHelpToggle();
    expect(uiStateServiceSpy.toggleHelp.calls.count()).toBe(1);
  });

});
