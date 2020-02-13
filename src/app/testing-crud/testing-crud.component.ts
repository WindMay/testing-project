import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';


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

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.setInitialState();
  }

  setInitialState() {
    this.loading = true;
    this.loadUser();
  }

  loadUser() {
    this.httpClient.get('http://localhost:3000/users').toPromise().then((ok) => {
      this.loading = false;
      this.user = ok as User;
    }).catch((err) => console.log('error: ', err));
  }



}
