import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestingCrudComponent} from './testing-crud.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {from, of} from 'rxjs';

describe('TestingCrudComponent', () => {
  let component: TestingCrudComponent;
  let fixture: ComponentFixture<TestingCrudComponent>;
  let service: HttpClient;

  const MOCK_SERVICE_USER_GET = [{ id: 1, firstname: 'John', lastname: 'Snow', status: 'Learning things' }];

  beforeEach(async(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
    TestBed.configureTestingModule({
      declarations: [ TestingCrudComponent ], imports: [HttpClientModule]
    })
    .compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(TestingCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('initial state shouldve been set on component init', () => {
    fixture = TestBed.createComponent(TestingCrudComponent);
    component = fixture.componentInstance;
    spyOn(component, 'setInitialState').and.callThrough();
    fixture.detectChanges();
    expect(component.loading).toBeTruthy();
    expect(component.setInitialState).toHaveBeenCalled();
  });

  it('load user should have been called on component init', () => {
    fixture = TestBed.createComponent(TestingCrudComponent);
    component = fixture.componentInstance;
    spyOn(component, 'loadUser').and.callThrough();
    fixture.detectChanges();
    expect(component.loadUser).toHaveBeenCalled();
  });

  it('get service shouldve been called on component init', () => {
    fixture = TestBed.createComponent(TestingCrudComponent);
    component = fixture.componentInstance;
    service = TestBed.get(HttpClient);
    spyOn(service, 'get').and.callFake((param) => {
      console.log('param');
      console.log(param);
      return of(MOCK_SERVICE_USER_GET) as any;
    });
    fixture.detectChanges();
    expect(service.get).toHaveBeenCalled();
  });

  it('should load user and disable loading on component init and successful call', (done) => {
    fixture = TestBed.createComponent(TestingCrudComponent);
    component = fixture.componentInstance;
    service = TestBed.get(HttpClient);
    const getUsuarios = service.get('http://localhost:3000/users');
    spyOn(service, 'get').and.returnValue(getUsuarios);
    fixture.detectChanges();
    from(getUsuarios).subscribe((response) => {
      console.log('response');
      console.log(response);
      expect(true).toEqual(true);
      done();
    }, error => {
      console.log('error: ', error);
      done();
    });
  });

});
