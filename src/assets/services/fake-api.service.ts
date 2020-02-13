import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

/**
 * Interfaces
 */

/**
 * IPaginatedResponse<T> Provisional interface that describes how a paginated response body should be.
 *
 * @remarks pagination_metadata holds all the pagination data such as:
 * page: number
 * per_page: number
 * page_count: number
 * total_count: number
 * @remarks records holds all all the requested data of type T inside an array[T]
 * @param T - Record typing that would be used in the records array
 */
export interface IPaginatedResponse<T> {
  pagination_metadata: {
    page: number;
    per_page: number;
    page_count: number;
    total_count: number;
  };
  records: T[];
}

export interface IBaseFakeApiConfig {
  responseDelay: number;
  randomResponseTime: boolean;
}

/**
 * Types
 */
export type PartialPaginatedResponse<T> = HttpResponse<Partial<IPaginatedResponse<T>>>;
export type PartialResponse<T> = HttpResponse<Partial<T>>;

/**
 * Constants
 */

export const DEFAULT_FAKE_API_CONFIG: IBaseFakeApiConfig = {
  responseDelay: 2000,
  randomResponseTime: false
};

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {
  readonly serviceConfig: IBaseFakeApiConfig;
  private delayedResponsePromiseExecutor = (response: any, code: number, delay: number, success: boolean) => {
    return (resolve, reject) => {
      setTimeout(() => {
        if (success) {
          resolve(new HttpResponse({
            body: response,
            status: code ? code : 200,
          }));
        } else {
          reject(new HttpResponse({
            body: response,
            status: code ? code : 500
          }));
        }
      }, delay);
    };
  }

  constructor(private httpClient: HttpClient, @Inject('fakeApiConfig') @Optional() public fakeApiConfig?: IBaseFakeApiConfig) {
    this.serviceConfig = fakeApiConfig || DEFAULT_FAKE_API_CONFIG;
  }

  fakeGet(responseBody: Partial<any>, makeItSuccessful: boolean, statusCode?: number,
          responseDelay = this.serviceConfig.responseDelay): Promise<PartialResponse<any>> {
    return new Promise(
      this.delayedResponsePromiseExecutor(responseBody, statusCode,
        this.serviceConfig.randomResponseTime ? Math.floor(Math.random() * responseDelay) + 1000 : responseDelay, makeItSuccessful));
  }

  fakeGetPaginated(responseBody: Partial<IPaginatedResponse<any>>, makeItSuccessful: boolean, statusCode?: number,
                   responseDelay = this.serviceConfig.responseDelay): Promise<PartialPaginatedResponse<any>> {
    return new Promise(this.delayedResponsePromiseExecutor(responseBody, statusCode,
      this.serviceConfig.randomResponseTime ? Math.floor(Math.random() * responseDelay) + 1000 : responseDelay, makeItSuccessful));
  }
}
