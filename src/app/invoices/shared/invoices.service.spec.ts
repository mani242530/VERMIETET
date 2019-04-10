import {async, TestBed, inject, getTestBed} from '@angular/core/testing';

import {InvoicesService} from './invoices.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {BrowserModule} from '@angular/platform-browser';
import {Invoice} from './invoice';

const BASE_URL = 'http://localhost:3000/api/invoices';
const MOCK_DATA: Invoice[] = [
  {
    id: 1,
    date: '2018-06-01',
    subject: 'Rent June',
    amount: '500',
    IBAN: 'DE89 3704 0044 0532 0130 91',
  }, {
    id: 1,
    date: '2019-01-01',
    subject: 'Rent January',
    amount: '500',
    IBAN: 'DE89 3704 0044 0532 0130 91',
  }
];

describe('InvoicesService', () => {
  let injector: TestBed;
  let service: InvoicesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule, HttpClientModule, HttpClientTestingModule
      ],
      providers: [InvoicesService]
    });

    injector = getTestBed();
    service = injector.get(InvoicesService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', inject([InvoicesService], (svg: InvoicesService) => {
    expect(svg).toBeTruthy();
  }));

  it('should get list of all invoices', async(() => {
    service
      .findAll()
      .subscribe((data: Invoice[]) => {
        expect(data.length).toBe(2);
        expect(data[0]).toBe(MOCK_DATA[0]);
        expect(data[1]).toBe(MOCK_DATA[1]);
      });

    const req = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA);
  }));

  it('should get invoice by id', async(() => {
    const id = 1;
    service
      .findById(id)
      .subscribe((response: Invoice) => {
        expect(response).toBe(MOCK_DATA[0]);
      });

    const req = httpMock.expectOne(`${BASE_URL}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA[0]);
  }));

  it('should insert new Invoice', async(() => {
    const newInvoice = {
      id: 3,
      date: '2018-11-01',
      subject: 'Rent November',
      amount: '500',
      IBAN: 'DE89 3704 0044 0532 0130 91'
    };
    service
      .insert(newInvoice)
      .subscribe((successResult) => {
        expect(successResult).toBe(newInvoice);
      });

    const req: TestRequest = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json; charset=utf-8');
    req.flush(newInvoice);
  }));

  it('should save updates to an existing Invoice', async(() => {
    const invoice = {
      ...MOCK_DATA[1]
    };
    const id = invoice.id;
    service
      .update(invoice)
      .subscribe((successResult) => {
        expect(successResult).toBe(invoice);
      });

    const req: TestRequest = httpMock.expectOne(`${BASE_URL}/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Content-Type')).toBe('application/json; charset=utf-8');
    req.flush(invoice);
  }));

  it('should delete an existing Invoice', async(() => {
    const data = MOCK_DATA[1];
    service
      .delete(data.id)
      .subscribe((successResult) => {
        expect(successResult).toBe(data);
      }, (errorResult) => {
        throw(errorResult);
      });

    const req: TestRequest = httpMock.expectOne(`${BASE_URL}/${data.id}`);
    expect(req.request.method).toBe('DELETE');
  }));
});
