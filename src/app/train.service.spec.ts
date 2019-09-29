import { TestBed } from '@angular/core/testing';

import { TrainService } from './train.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Train } from './train';
import { Observable } from 'rxjs';
import { Port } from './port';

describe('TrainService', () => {
  
  beforeEach(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ], 
      providers: [
        {provide: HttpClient, useValue: httpClientSpy}, 
      ]
    });
  });
  
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let trainService: jasmine.SpyObj<TrainService>;

  beforeEach(() => {
    httpClientSpy = TestBed.get(HttpClient);
    trainService = TestBed.get(TrainService);
  });

  it('should be created', () => {
    const service: TrainService = TestBed.get(TrainService);
    expect(service).toBeTruthy();
  });

  it('#getTrains should return stubbed value from a spy', () => {
    const stubValue = new Observable<Array<Train>>();
    httpClientSpy.get.and.returnValue(stubValue);

    expect(trainService.getTrains()).toBe(stubValue, 'service returned stub value');
    expect(httpClientSpy.get.calls.count()).toBe(1, 'spy method was called once');
    expect(httpClientSpy.get.calls.mostRecent().returnValue).toBe(stubValue);
  });

  it('#updateTrain should update the train', () => {
    let testTrain: Train = new Train();
    const stubValue = new Observable<Train>();
    httpClientSpy.post.and.returnValue(stubValue);

    expect(trainService.updateTrain(testTrain)).toBe(stubValue);
    expect(httpClientSpy.post.calls.count()).toBe(1);
    expect(httpClientSpy.post.calls.mostRecent().returnValue).toBe(stubValue);
  });

  it('#updatePort should update the port', () => {
    let testPort: Port = new Port();
    const stubValue = new Observable<void>();
    httpClientSpy.post.and.returnValue(stubValue);

    expect(trainService.updatePort(testPort)).toBe(stubValue);
    expect(httpClientSpy.post.calls.count()).toBe(1);
    expect(httpClientSpy.post.calls.mostRecent().returnValue).toBe(stubValue);
  });

  it('#discoverTrain should initiate discovery', () => {
    const stubValue = new Observable<String>();
    httpClientSpy.get.and.returnValue(stubValue);

    expect(trainService.discoverTrain()).toBe(stubValue);
    expect(httpClientSpy.get.calls.count()).toBe(1);
    expect(httpClientSpy.get.calls.mostRecent().returnValue).toBe(stubValue);   
  });

  it('#connectTrain should connect', () => {
    let testTrain: Train = new Train();
    const stubValue = new Observable<void>();
    httpClientSpy.post.and.returnValue(stubValue);

    expect(trainService.connectTrain(testTrain)).toBe(stubValue);
    expect(httpClientSpy.post.calls.count()).toBe(1);
    expect(httpClientSpy.post.calls.mostRecent().returnValue).toBe(stubValue);   
  });

  it('#disconnectTrain should disconnect', () => {
    let testTrain: Train = new Train();
    const stubValue = new Observable<void>();
    httpClientSpy.post.and.returnValue(stubValue);

    expect(trainService.disconnectTrain(testTrain)).toBe(stubValue);
    expect(httpClientSpy.post.calls.count()).toBe(1);
    expect(httpClientSpy.post.calls.mostRecent().returnValue).toBe(stubValue);   
  });
  
  it('#removeTrain should remove', () => {
    let testTrain: Train = new Train();
    const stubValue = new Observable<void>();
    httpClientSpy.post.and.returnValue(stubValue);

    expect(trainService.removeTrain(testTrain)).toBe(stubValue);
    expect(httpClientSpy.post.calls.count()).toBe(1);
    expect(httpClientSpy.post.calls.mostRecent().returnValue).toBe(stubValue);   
  });

  it('#shutdownBluetooth should send shutdown request', () => {
    const stubValue = new Observable<void>();
    httpClientSpy.get.and.returnValue(stubValue);

    expect(trainService.shutdownBluetooth()).toBe(stubValue);
    expect(httpClientSpy.get.calls.count()).toBe(1);
    expect(httpClientSpy.get.calls.mostRecent().returnValue).toBe(stubValue);   
  });
  
  it('#connectAll should connect all trains', () => {
    const stubValue = new Observable<void>();
    httpClientSpy.get.and.returnValue(stubValue);

    expect(trainService.connectAll()).toBe(stubValue);
    expect(httpClientSpy.get.calls.count()).toBe(1);
    expect(httpClientSpy.get.calls.mostRecent().returnValue).toBe(stubValue);   
  });

  it('#disconnectAll should disconnect all trains', () => {
    const stubValue = new Observable<void>();
    httpClientSpy.get.and.returnValue(stubValue);

    expect(trainService.disconnectAll()).toBe(stubValue);
    expect(httpClientSpy.get.calls.count()).toBe(1);
    expect(httpClientSpy.get.calls.mostRecent().returnValue).toBe(stubValue);   
  });
  
  it('#stopAll should stop all trains', () => {
    const stubValue = new Observable<void>();
    httpClientSpy.get.and.returnValue(stubValue);

    expect(trainService.stopAll()).toBe(stubValue);
    expect(httpClientSpy.get.calls.count()).toBe(1);
    expect(httpClientSpy.get.calls.mostRecent().returnValue).toBe(stubValue);   
  });

  it('#trainUpdateStream should listen to updates', () => {
    const createSpy: jasmine.Spy = spyOn(Observable, 'create');
    const stubValue = new Observable<Train>();
    createSpy.and.returnValue(stubValue);

    expect(trainService.trainUpdateStream()).toBe(stubValue);
  });


});
