import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Invoice} from './invoice';

@Injectable()
export class InvoicesService {
  protected URL = 'http://localhost:3000/api/invoices';

  constructor(protected http: HttpClient) {
  }

  /**
   * Find an object by its identifier
   * @param id the object identifier
   * @returns gets the object found
   */
  public findById(id: any): Observable<Invoice> {
    return this.http.get<Invoice>(this.URL + '/' + id);
  }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.URL, {params: params});
  }

  /**
   * Delete an object by its identifier field
   * @param id the object identifier
   * @returns gets the response
   */
  public delete(id): Observable<Invoice> {
    return this.http.delete<Invoice>(this.URL + '/' + id);
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
  public insert(data: Invoice): Observable<Invoice> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post<Invoice>(this.URL, data, {headers: headers});
  }

  /**
   * Update specific object into DB
   * @param invoice the object to be updated
   * @returns gets the response
   */
  public update(invoice: Invoice): Observable<Invoice> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.put<Invoice>(this.URL + '/' + invoice.id, invoice, {headers: headers});
  }
}
