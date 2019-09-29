import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainComponent } from './train.component';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { PowerControlComponent } from '../power-control/power-control.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { KeyValuePipe } from '@angular/common';
import { Train } from '../train';
import { Observable } from 'rxjs';
import { TrainService } from '../train.service';
import { Port } from '../port';
import { EventEmitter } from '@angular/core';

describe('TrainComponent', () => {
  let component: TrainComponent;
  let fixture: ComponentFixture<TrainComponent>;

  beforeEach(async(() => {
    const trainServiceSpy = jasmine.createSpyObj('TrainService', ['disconnectTrain', 'connectTrain', 'removeTrain']);
    const stubValue = new Observable<void>();
    trainServiceSpy.connectTrain.and.returnValue(stubValue);
    trainServiceSpy.disconnectTrain.and.returnValue(stubValue);
    trainServiceSpy.removeTrain.and.returnValue(stubValue);

    TestBed.configureTestingModule({
      declarations: [ 
        TrainComponent,
        ColorPickerComponent,
        PowerControlComponent
      ],
      imports: [
        FormsModule,
        HttpClientModule,
      ],
      providers: [
        KeyValuePipe,
        {provide: TrainService, useValue: trainServiceSpy}, 
      ]
    })
    .compileComponents();
  }));

  let trainServiceSpy: jasmine.SpyObj<TrainService>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainComponent);
    component = fixture.componentInstance;
    component.train = new Train();
    component.train.name = "Test Train";
    trainServiceSpy = TestBed.get(TrainService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the color picker', () => {
    expect(component.showColorPicker).toBe(false);
    component.toggleColorPicker();
    expect(component.showColorPicker).toBe(true);
    component.toggleColorPicker();
    expect(component.showColorPicker).toBe(false);
  });

  it('should toggle the remove option', () => {
    expect(component.showRemoveOption).toBe(false);
    component.toggleRemoveOption();
    expect(component.showRemoveOption).toBe(true);
    component.toggleRemoveOption();
    expect(component.showRemoveOption).toBe(false);
  });

  it('should disconnect', () => {
    component.onDisconnect(component.train);
    expect(trainServiceSpy.disconnectTrain.calls.count()).toBe(1);
    expect(trainServiceSpy.disconnectTrain).toHaveBeenCalledWith(component.train);
  });

  it('should connect if not already connecting', () => {
    component.onConnect(component.train);
    expect(component.connecting).toBe(true);
    expect(trainServiceSpy.connectTrain.calls.count()).toBe(1);
    expect(trainServiceSpy.connectTrain).toHaveBeenCalledWith(component.train);

    component.onConnect(component.train);
    expect(trainServiceSpy.connectTrain.calls.count()).toBe(1);
  });

  it('should filter motor ports', () => {
    component.motorPorts = null;
    let portsMap: Map<number, Port> = new Map<number, Port>();
    portsMap.set(0, {url: "12:34:56:78:9A:B0", id: 0, deviceType: 1, power: 0});
    portsMap.set(1, {url: "12:34:56:78:9A:B0", id: 1, deviceType: 2, power: 0});
    portsMap.set(2, {url: "12:34:56:78:9A:B0", id: 2, deviceType: 0, power: 0});
    portsMap.set(3, {url: "12:34:56:78:9A:B0", id: 3, deviceType: 54, power: 0});
    component.train.ports = portsMap;
    component.ngOnChanges();
    expect(component.motorPorts).toBeDefined();
    expect(component.motorPorts.get(0)).toBeDefined();
    expect(component.motorPorts.get(1)).toBeDefined();
    expect(component.motorPorts.get(2)).toBeUndefined();
    expect(component.motorPorts.get(3)).toBeUndefined();
  });

  it('should remove the train and notify', () => {
    let onRemoveSpy: jasmine.SpyObj<EventEmitter<Train>> = jasmine.createSpyObj('EventEmitter<Train>', ['next']);
    component.onRemove = onRemoveSpy;

    component.removeTrain(component.train);
    expect(trainServiceSpy.removeTrain.calls.count()).toBe(1);
    expect(trainServiceSpy.removeTrain).toHaveBeenCalledWith(component.train);
    expect(onRemoveSpy.next.calls.count()).toBe(1);
    expect(onRemoveSpy.next).toHaveBeenCalledWith(component.train);
  });

});
