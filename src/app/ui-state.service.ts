import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {

  colorPickerShown: Set<string> = new Set();
  helpShown = false;

  constructor() { }

  toggleColorPicker(trainUrl: string) {
    if(this.colorPickerShown.has(trainUrl)){
      this.colorPickerShown.delete(trainUrl);
    }else{
      this.colorPickerShown.add(trainUrl);
    }
  }

  toggleHelp() {
    this.helpShown = !this.helpShown;
  }

  setHelpShown(shown: boolean) {
    this.helpShown = shown;
  }

  isColorPickerShown(trainUrl: string): boolean {
    return this.colorPickerShown.has(trainUrl);
  }

  isHelpShown(): boolean {
    return this.helpShown;
  }



}
