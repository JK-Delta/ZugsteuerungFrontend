import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainListComponent } from './train-list.component';
import { TrainComponent } from '../train/train.component';
import { PowerControlComponent } from '../power-control/power-control.component';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TrainService } from '../train.service';
import { Train } from '../train';
import { KeyValuePipe } from '@angular/common';
import { Port } from '../port';
import { DarkModeService } from '../dark-mode.service';
import { UiStateService } from '../ui-state.service';

describe('TrainListComponent', () => {
  let component: TrainListComponent;
  let fixture: ComponentFixture<TrainListComponent>;

  beforeEach(async(() => {
    const trainServiceSpy = jasmine.createSpyObj('TrainService', ['getTrains', 'discoverTrain', 'shutdownBluetooth', 'trainUpdateStream']);
    
    const testTrain: Train = new Train();
    testTrain.ports = new Map<number, Port>();
    testTrain.name = "T1";
    testTrain.url = "1";
    testTrain.color = {r: 180, g: 20, b: 0};
    const testTrain2: Train = new Train();
    testTrain2.ports = new Map<number, Port>();
    testTrain2.name = "T2";
    testTrain2.url = "2";
    testTrain2.color = {r: 180, g: 20, b: 0};
    const stubTrainList: Train[] = [testTrain, testTrain2];

    trainServiceSpy.getTrains.and.returnValue(of(stubTrainList));
    trainServiceSpy.discoverTrain.and.returnValue(of('1'));

    const stubValue = new Observable<void>();
    trainServiceSpy.shutdownBluetooth.and.returnValue(stubValue);
    trainServiceSpy.trainUpdateStream.and.returnValue(of(testTrain));

    const darkModeServiceSpy: jasmine.SpyObj<DarkModeService> = jasmine.createSpyObj('DarkModeService', ['nothing']);
    darkModeServiceSpy.active = false;
    
    const uiStateServiceSpy: jasmine.SpyObj<UiStateService> = jasmine.createSpyObj('UiStateService', ['setHelpShown', 'isColorPickerShown']);

    TestBed.configureTestingModule({
      declarations: [ 
        TrainListComponent,
        TrainComponent,
        PowerControlComponent,
        ColorPickerComponent
      ],
      imports: [
        FormsModule,
        HttpClientModule
      ],
      providers: [
        KeyValuePipe,
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
    fixture = TestBed.createComponent(TrainListComponent);
    component = fixture.componentInstance;
    trainServiceSpy = TestBed.get(TrainService);
    darkModeServiceSpy = TestBed.get(DarkModeService);
    uiStateServiceSpy = TestBed.get(UiStateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all trains', () => {
    // This should have alredy been called during ngOnInit()
    expect(trainServiceSpy.getTrains.calls.count()).toBe(1);

    component.loadAllTrains();
    expect(component.trainList.length).toBe(2);
    expect(trainServiceSpy.getTrains.calls.count()).toBe(2);
  });

  it('should show the help if the train list is empty', () => {
    // This should have alredy been called during ngOnInit()
    expect(trainServiceSpy.getTrains.calls.count()).toBe(1);
    trainServiceSpy.getTrains.and.returnValue(of([]));

    component.loadAllTrains();
    expect(component.trainList.length).toBe(0);
    expect(trainServiceSpy.getTrains.calls.count()).toBe(2);
    expect(uiStateServiceSpy.setHelpShown.calls.count()).toBe(1);
    expect(uiStateServiceSpy.setHelpShown).toHaveBeenCalledWith(true);
  });

  it('should switch dark mode on and off', () => {
    expect(darkModeServiceSpy.active).toBe(false);
    component.onDarkModeSwitch();
    expect(darkModeServiceSpy.active).toBe(true);
    component.onDarkModeSwitch();
    expect(darkModeServiceSpy.active).toBe(false);
  });
});
