import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerControlComponent } from './power-control.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Train } from '../train';
import { Port } from '../port';
import { TrainService } from '../train.service';
import { Observable } from 'rxjs';

describe('PowerControlComponent', () => {
  let component: PowerControlComponent;
  let fixture: ComponentFixture<PowerControlComponent>;

  beforeEach(async(() => {
    const trainServiceSpy = jasmine.createSpyObj('TrainService', ['updatePort']);
    const stubValue = new Observable<void>();
    trainServiceSpy.updatePort.and.returnValue(stubValue);

    TestBed.configureTestingModule({
      declarations: [ PowerControlComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
      ],
      providers: [ {provide: TrainService, useValue: trainServiceSpy} ],
    })
    .compileComponents();
  }));

  let trainServiceSpy: jasmine.SpyObj<TrainService>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerControlComponent);
    component = fixture.componentInstance;
    component.train = new Train();
    component.port = new Port();
    trainServiceSpy = TestBed.get(TrainService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should stop the power', () => {
    let port: Port = new Port();
    port.power = 50;
    component.onStop(port);
    expect(port.power).toBe(0);
  });

  it('should change the power', () => {
    let port: Port = new Port();
    port.power = 0;
    component.onPowerChange(port, 10);
    expect(port.power).toBe(10);
    component.onPowerChange(port, 10);
    expect(port.power).toBe(20);
    component.onPowerChange(port, -80);
    expect(port.power).toBe(-60);
  });

  it('should keep the power within limits', () => {
    let port: Port = new Port();
    port.power = 0;
    component.onPowerChange(port, 150);
    expect(port.power).toBe(100);
    component.onPowerChange(port, -250);
    expect(port.power).toBe(-100);
  });

  it('should update the power', () => {
    component.onPowerInput();
    expect(trainServiceSpy.updatePort.calls.count()).toBe(1);
    expect(trainServiceSpy.updatePort).toHaveBeenCalledWith(component.port);
  });
  
});
