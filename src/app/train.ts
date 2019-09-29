import { Port } from './port';
import { Color } from './color';

export class Train {
  url: string;
  name: string;
  online: boolean;
  color: Color;
  
  // while connected/online
  battery: number = 1;
  distance: number = 0;
  power: number = 1;
  ports: Map<number, Port>;
}