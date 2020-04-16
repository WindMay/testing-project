import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FakeApiService, PartialPaginatedResponse} from '../../assets/services/fake-api.service';


const RECORDS_USERS = [
  {
    id: 1,
    firstname: 'MOCK USER 1',
    lastname: 'dñasdjsa',
    status: 'Learning things'
  },
  {
    id: 2,
    firstname: 'MOCK USER 2',
    lastname: 'dkasjds',
    status: 'dlkasjdklsajdas'
  }
];


export interface User {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}

@Component({
  selector: 'app-testing-crud',
  templateUrl: './testing-crud.component.html',
  styleUrls: ['./testing-crud.component.sass']
})
export class TestingCrudComponent implements OnInit {
  loading: boolean;
  user: User;
  users: PartialPaginatedResponse<User>;

  constructor(private httpClient: HttpClient, private fakeApiService: FakeApiService) { }

  ngOnInit() {
    this.setInitialState();
  }

  setInitialState() {
    this.loading = true;
    this.loadUser();
    this.fakeLoadUser();
  }

  loadUser() {
    this.httpClient.get('http://localhost:3000/users').toPromise().then((ok) => {
      this.loading = false;
      this.user = ok as User;
    }).catch((err) => console.log('error: ', err));
  }

  fakeLoadUser() {
    this.fakeApiService.fakeGetPaginated({
      pagination_metadata: {page: 0, page_count: 0, per_page: 0, total_count: 0},
      records: RECORDS_USERS}, true).then((ok) => {
        console.log('response', ok);
        this.users = ok;
    });
  }



}
