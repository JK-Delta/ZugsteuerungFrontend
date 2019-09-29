import { ApiUrlInterceptor } from './api-url-interceptor';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('ApiUrlInterceptor', () => {
  it('should create an instance', () => {
    expect(new ApiUrlInterceptor()).toBeTruthy();
  });

  it('should add the url of the server', () => {
    const request: HttpRequest<any> = new HttpRequest("GET", "api");
    const handlerSpy: jasmine.SpyObj<HttpHandler> = jasmine.createSpyObj("HttpHandler", ['handle']);
    const returnStub: Observable<HttpEvent<any>> = new Observable<HttpEvent<any>>();
    handlerSpy.handle.and.returnValue(returnStub);

    expect(new ApiUrlInterceptor().intercept(request, handlerSpy)).toBe(returnStub);
    expect(handlerSpy.handle.calls.count()).toBe(1);
    expect(handlerSpy.handle.calls.mostRecent().returnValue).toBe(returnStub);
    expect(handlerSpy.handle.calls.mostRecent().args[0].url).toBe('http://192.168.0.199:8080/api');
  });
});
