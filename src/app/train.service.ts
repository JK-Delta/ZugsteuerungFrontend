import { Injectable } from '@angular/core';
import { Train } from './train';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Port } from './port';
import { environment } from 'src/environments/environment';
import { Util } from './util';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  private apiUrl = 'api/';

  private trainListUrl = this.apiUrl + 'trainList';
  private trainUrl = this.apiUrl + 'train';
  private portUrl = this.apiUrl + 'port';
  private discoverUrl = this.apiUrl + 'discover';
  private removeUrl = this.apiUrl + 'remove';

  private connectUrl = this.apiUrl + 'connect';
  private disconnectUrl = this.apiUrl + 'disconnect';
  private connectAllUrl = this.apiUrl + 'connectAll';
  private disconnectAllUrl = this.apiUrl + 'disconnectAll';
  private stopAllUrl = this.apiUrl + 'stopAll';

  private shutdownBluetoothUrl = this.apiUrl + 'shutdownBluetooth';
  private requestPortInfoUrl = this.apiUrl + 'portInfo';
  private trainUpdateStreamUrl = this.apiUrl + 'trainUpdateStream';

  constructor(private http: HttpClient) { }

  getTrains(): Observable<Train[]> {
    return this.http.get<Train[]>(this.trainListUrl);
  }

  updateTrain(train: Train): Observable<Train> {
    return this.http.post<Train>(this.trainUrl, train, httpOptions);
  }

  updatePort(port: Port): Observable<void> {
    return this.http.post<void>(this.portUrl, port, httpOptions);
  }

  removeTrain(train: Train): Observable<void> {
    return this.http.post<void>(this.removeUrl, train, httpOptions);
  }

  discoverTrain(): Observable<String> {
    return this.http.get<String>(this.discoverUrl);
  }

  connectTrain(train: Train): Observable<void> {
    return this.http.post<void>(this.connectUrl, train, httpOptions);
  }

  disconnectTrain(train: Train): Observable<void> {
    return this.http.post<void>(this.disconnectUrl, train, httpOptions);
  }

  connectAll(): Observable<void> {
    return this.http.get<void>(this.connectAllUrl);
  }

  disconnectAll(): Observable<void> {
    return this.http.get<void>(this.disconnectAllUrl);
  }

  stopAll(): Observable<void> {
    return this.http.get<void>(this.stopAllUrl);
  }

  shutdownBluetooth(): Observable<void> {
    return this.http.get<void>(this.shutdownBluetoothUrl);
  }

  trainUpdateStream(): Observable<Train> {
    return Observable.create((observer) => {
      let eventSource = new EventSource(Util.getApiUrl() + this.trainUpdateStreamUrl);
      eventSource.onmessage = (event) => {
        let train = JSON.parse(event.data);
        observer.next(train);
      };
    });
  }

}
