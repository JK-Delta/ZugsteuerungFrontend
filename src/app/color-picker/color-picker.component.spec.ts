import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerComponent } from './color-picker.component';
import { HttpClientModule } from '@angular/common/http';
import { TrainService } from '../train.service';
import { Train } from '../train';
import { Observable } from 'rxjs';
import { Color } from '../color';

describe('ColorPickerComponent', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;

  beforeEach(async(() => {
    const trainServiceSpy = jasmine.createSpyObj('TrainService', ['updateTrain']);
    const stubValue = new Observable<void>();
    trainServiceSpy.updateTrain.and.returnValue(stubValue);
    
    TestBed.configureTestingModule({
      declarations: [ ColorPickerComponent ],
      imports: [ HttpClientModule ],
      providers: [ {provide: TrainService, useValue: trainServiceSpy} ],
    })
    .compileComponents();
  }));

  let trainServiceSpy: jasmine.SpyObj<TrainService>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
    component.train = new Train();
    trainServiceSpy = TestBed.get(TrainService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the train color', () => {
    let color: Color = {r: 180, g: 20, b: 0};
    expect(component.onColorPick(color));
    expect(component.train.color).toBe(color);
  });

  it('should call the train service with the updated train', () => {
    let color: Color = {r: 180, g: 20, b: 0};
    expect(component.onColorPick(color));
    expect(trainServiceSpy.updateTrain.calls.count()).toBe(1);
    expect(trainServiceSpy.updateTrain).toHaveBeenCalledWith(component.train);
  });
});
