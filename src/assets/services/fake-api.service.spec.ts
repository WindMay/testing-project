import { TestBed } from '@angular/core/testing';
import {HttpClient, HttpHandler, HttpResponse} from '@angular/common/http';
import {from} from 'rxjs';
import {FakeApiService, IPaginatedResponse} from './fake-api.service';
import {mockPaginatedResponseGenerator} from '../functions/generators';

describe('FakeApiService', () => {
  let service: FakeApiService;
  let getPaginated: Promise<HttpResponse<Partial<IPaginatedResponse<any>>>>;
  let paginatedResponse: Partial<IPaginatedResponse<any>>;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpHandler,
      HttpClient,
      FakeApiService, {provide: 'fakeApiConfig', useValue: {responseDelay: 100, randomResponseTime: true}}
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(FakeApiService);
    paginatedResponse = mockPaginatedResponseGenerator(10, 50);
  });

  it('should be created', () => {
    service = TestBed.get(FakeApiService);
    expect(service).toBeTruthy();
  });

  it('fakeGet should return a paginated response', (done) => {
    getPaginated = service.fakeGet(paginatedResponse, true);
    spyOn(service, 'fakeGetPaginated').and.returnValue(getPaginated);

    from(getPaginated).subscribe((response) => {
      expect(response.body).toEqual(paginatedResponse);
      done();
    });
  });

  it('fakeGetPaginated should return a error message and 404 status on failed get mock', (done) => {
    const errorMsg = 'something went wrong';
    getPaginated = service.fakeGet({error : errorMsg}, false, 404);
    spyOn(service, 'fakeGetPaginated').and.returnValue(getPaginated);

    from(getPaginated).subscribe((response) => {
    }, (failedResponse) => {
      expect(failedResponse.status === 404 && failedResponse.body.error === errorMsg).toBeTruthy();
      done();
    });
  });

  it('fakeGetPaginated should return a paginated response', (done) => {
    getPaginated = service.fakeGetPaginated(paginatedResponse, true);
    spyOn(service, 'fakeGetPaginated').and.returnValue(getPaginated);

    from(getPaginated).subscribe((response) => {
      expect(response.body).toEqual(paginatedResponse);
      done();
    });
  });

  it('fakeGetPaginated should return null body and 404 status on failed get mock', (done) => {
    getPaginated = service.fakeGetPaginated(null, false, 500);
    spyOn(service, 'fakeGetPaginated').and.returnValue(getPaginated);

    from(getPaginated).subscribe((response) => {
      }, (failedResponse) => {
      expect(failedResponse.status === 500 && !failedResponse.body).toBeTruthy();
      done();
    });
  });
});
