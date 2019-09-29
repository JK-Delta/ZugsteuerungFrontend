import { Component, OnInit, Input } from '@angular/core';
import { Port } from '../port';
import { Train } from '../train';
import { TrainService } from '../train.service';
import { Subject } from 'rxjs/internal/Subject';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-power-control',
  templateUrl: './power-control.component.html',
  styleUrls: ['./power-control.component.css']
})
export class PowerControlComponent implements OnInit {

  @Input()
  port: Port = null;
  @Input()
  train: Train = null;
  powerChanged = new Subject<void>();

  constructor(private trainService: TrainService) { }

  ngOnInit() {
    this.powerChanged.pipe(throttleTime(1500, undefined, {leading:true, trailing:true})).subscribe(() => this.onPowerUpdate());
  }

  onStop(port) {
    port.power = 0;
    this.trainService.updatePort(port).subscribe();
  }
  
  onPowerChange(port, change) {
    port.power = Math.min(Math.max(-100, port.power + change), 100);
    this.trainService.updatePort(this.port).subscribe();
  }

  onPowerUpdate(){
    this.trainService.updatePort(this.port).subscribe();
  }

  onPowerInput(){
    this.powerChanged.next();
  }

}
