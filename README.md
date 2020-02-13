# TestingProject

Project created for the Unit testing introduction.

Some tests may require a fake mock API.

You may use mockoon to render the api request, and instruct to listen on 0.0.0.0:3000 
and respond on:

`http://localhost:3000/users`

with this body:

`````
{
    "id": 2,
    "firstname": "Daenerys",
    "lastname": "Targaryen",
    "status": "Riding a dragon"
}
`````


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.


## Warning
This project doesn't implements the best testing practices, it was made to demo some jasmine features

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

