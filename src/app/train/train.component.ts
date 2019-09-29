import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Train } from '../train';
import { TrainService } from '../train.service';
import { Port } from '../port';
import { KeyValuePipe, KeyValue } from '@angular/common';
import { UiStateService } from '../ui-state.service';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent implements OnInit {
  
  @Input()
  train: Train = null;
  motorPorts: Map<number, Port> = new Map<number, Port>();

  connecting: boolean = false;
  showRemoveOption: boolean = false;
  showColorPicker: boolean = false;

  @Output() onRemove = new EventEmitter<Train>();

  constructor(private trainService: TrainService, private uiStateService: UiStateService, private keyValuePipe: KeyValuePipe) { }

  ngOnInit() {
  }

  ngOnChanges() {
    // Filter ports to only show Motor ports
    this.motorPorts = new Map<number, Port>();
    if (this.train == null) {
      return;
    }
    this.keyValuePipe.transform(this.train.ports).forEach((entry: KeyValue<number, Port>, index: number, entryArray: KeyValue<number, Port>[]) => {
      let motorIds : Array<number> = Array();
      motorIds.push(1) // Motor
      motorIds.push(2) // Train Motor
      if (motorIds.includes(entry.value.deviceType)) {
        this.motorPorts.set(entry.key, entry.value);
      }
      return 0;
    });

    this.showColorPicker = this.uiStateService.isColorPickerShown(this.train.url);
  }

  onConnect(train) {
    if(!this.connecting && !train.online){
      this.connecting = true;
      this.trainService.connectTrain(train).subscribe();
    }else if(train.online){
      train.online = false;
      this.trainService.disconnectTrain(train).subscribe();
    }
    // TODO abort if trying to connect but not yet online
    
  }

  onDisconnect(train: Train) {
    this.trainService.disconnectTrain(train).subscribe();
  }

  removeTrain(train: Train) {
    this.trainService.removeTrain(train).subscribe();
    this.onRemove.next(train);
  }

  toggleRemoveOption() {
    this.showRemoveOption = !this.showRemoveOption;
  }

  toggleColorPicker() {
    this.uiStateService.toggleColorPicker(this.train.url);
    this.showColorPicker = !this.showColorPicker;
  }

}
