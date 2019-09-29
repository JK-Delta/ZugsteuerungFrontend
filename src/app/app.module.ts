import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { TrainComponent } from './train/train.component';
import { ApiUrlInterceptor } from './api-url-interceptor';
import { TrainListComponent } from './train-list/train-list.component';
import { PowerControlComponent } from './power-control/power-control.component';
import { KeyValuePipe } from '@angular/common';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ControlBarComponent } from './control-bar/control-bar.component';
import { HelpComponent } from './help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    TrainComponent,
    TrainListComponent,
    PowerControlComponent,
    ColorPickerComponent,
    ControlBarComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    /* HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
     ) */
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true},
    KeyValuePipe, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
