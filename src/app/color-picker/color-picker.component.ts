import { Component, OnInit, Input } from '@angular/core';
import { Train } from '../train';
import { TrainService } from '../train.service';
import { Color } from '../color';
import { Util } from "../util";

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {
  
  getRgbString = Util.getRgbString;

  colorList: Color[] = [
    {r: 0, g: 200, b: 0},
    {r: 240, g: 220, b: 0},
    {r: 180, g: 20, b: 0},
    {r: 120, g: 0, b: 160},
    {r: 0, g: 100, b: 180},
    {r: 0, g: 160, b: 220},
    {r: 180, g: 180, b: 180},
    {r: 240, g: 240, b: 240}];
  color: Color = {r: 50, g: 120 , b: 0};

  @Input()
  train: Train;

  constructor(private trainService: TrainService) { }

  ngOnInit() {
  }

  onColorPick(color: Color) {
    this.train.color = color;
    this.trainService.updateTrain(this.train).subscribe();
  }

}
