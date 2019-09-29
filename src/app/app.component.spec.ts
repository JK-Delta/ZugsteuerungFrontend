import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TrainListComponent } from './train-list/train-list.component';
import { TrainComponent } from './train/train.component';
import { PowerControlComponent } from './power-control/power-control.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { Train } from './train';
import { Port } from './port';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ControlBarComponent } from './control-bar/control-bar.component';
import { HelpComponent } from './help/help.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ControlBarComponent,
        TrainListComponent,
        TrainComponent,
        PowerControlComponent,
        ColorPickerComponent,
        HelpComponent,
      ],
      imports: [
        FormsModule,
        HttpClientModule,
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ZugsteuerungFrontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ZugsteuerungFrontend');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Zugsteuerung');
  });
});
