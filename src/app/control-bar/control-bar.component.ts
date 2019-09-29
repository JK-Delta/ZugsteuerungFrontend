import { Component, OnInit } from '@angular/core';
import { TrainService } from '../train.service';
import { DarkModeService } from '../dark-mode.service';
import { UiStateService } from '../ui-state.service';

@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.css']
})
export class ControlBarComponent implements OnInit {

  discovery: boolean = false;
  darkModeActive: boolean = false;

  constructor(private trainService: TrainService, private darkMode: DarkModeService, private uiState: UiStateService) { }

  ngOnInit() {
  }

  stopAllTrains() {
    this.trainService.stopAll().subscribe();
  }

  connectAllTrains(){
    this.trainService.connectAll().subscribe();
  }

  disconnectAllTrains(){
    this.trainService.disconnectAll().subscribe();
  }

  loadAllTrains(){
    this.trainService.getTrains().subscribe();
  }

  onDiscover() {
    this.discovery = !this.discovery;
    this.trainService.discoverTrain().subscribe(result => this.discovery = result == "1" ? true : false);
  }

  shutdownBluetooth() {
    this.trainService.shutdownBluetooth().subscribe();
  }

  onDarkModeSwitch() {
    this.darkMode.active = !this.darkMode.active;
    document.body.className = this.darkMode.active ? "dark" : "";
  }

  onHelpToggle() {
    this.uiState.toggleHelp();
  }

}
