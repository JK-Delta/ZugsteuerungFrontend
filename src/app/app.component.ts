import { Component } from '@angular/core';
import { DarkModeService } from './dark-mode.service';
import { UiStateService } from './ui-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ZugsteuerungFrontend';

  constructor(private darkMode: DarkModeService, private uiState: UiStateService) {}
  
  isHelpShown() : boolean {
    return this.uiState.isHelpShown();
  }

}
