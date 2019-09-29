import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Train } from '../train';
import { TrainService } from '../train.service';
import { catchError } from "rxjs/operators";
import { DarkModeService } from '../dark-mode.service';
import { Util } from "../util";
import { UiStateService } from '../ui-state.service';

@Component({
  selector: 'app-train-list',
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.css']
})
export class TrainListComponent implements OnInit {

  getRgbString = Util.getRgbString;

  trainList: Train[] = [];

  darkModeActive: boolean = false;

  constructor(private trainService: TrainService, private ngZone: NgZone, private darkMode: DarkModeService,
    private uiState: UiStateService) { }

  ngOnInit() {
    this.loadAllTrains();

    this.trainService.trainUpdateStream().subscribe(train => {
      //console.log(NgZone.isInAngularZone()); // is false here

      this.ngZone.run(() => {
        let newTrains: Train[] = [];
        this.trainList.forEach(train => newTrains.push(train));

        let index = newTrains.findIndex(value => value.url == train.url);
        newTrains.splice(index, 1, train);
        this.trainList = newTrains;
      });
    });
  }

  loadAllTrains() {
    this.trainService.getTrains().subscribe(trains => {
      this.trainList = trains;
      if(this.trainList.length == 0){
        this.uiState.setHelpShown(true);
      }
    });
  }

  removeTrain(train) {
    let index = this.trainList.findIndex(value => value.url == train.url);
    this.trainList.splice(index, 1);
  }

  onDarkModeSwitch() {
    this.darkMode.active = !this.darkMode.active;
    document.body.className = this.darkMode.active ? "dark" : "";
  }

}
