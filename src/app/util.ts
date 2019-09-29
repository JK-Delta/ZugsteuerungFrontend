import { Color } from './color';
import { environment } from 'src/environments/environment';

export class Util {

    static getRgbString(c: Color) {
        return 'rgb(' + c.r + ', ' + c.g + ', ' + c.b + ')';
    }

    static getApiUrl() {
        if(environment.useApiUrl) {
            return environment.apiUrl;
        }else{
            return "http://" + window.location.hostname + ":8080/";
        }
    }
    
}