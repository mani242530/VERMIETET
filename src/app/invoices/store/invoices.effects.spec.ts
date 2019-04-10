import {TestBed, async} from '@angular/core/testing';
import {Actions} from '@ngrx/effects';
import {EffectsModule} from '@ngrx/effects';
import {InvoiceEffects} from './invoices.effects';
import {InvoicesService} from '../shared/invoices.service';
import {cold} from 'jasmine-marbles';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';
import {
  GET_INVOICES_SUCCESS,
  GET_INVOICES,
  GetAllInvoicesSuccess,
  GetAllInvoicesError,
  GET_INVOICE,
  GetInvoiceSuccess,
  GetInvoiceError,
  UPDATE_INVOICE,
  UpdateInvoiceSuccess,
  UpdateInvoiceError,
  CREATE_INVOICE,
  AddInvoiceSuccess,
  AddInvoiceError,
  DELETE_INVOICE,
  RemoveInvoiceSuccess,
  RemoveInvoiceError
} from './invoices.actions';
import {Invoice} from '../shared/invoice';

const MOCK_DATA: Invoice[] = [
  {
    id: 3,
    date: '2019-04-01',
    subject: 'Rent April',
    amount: '500',
    IBAN: 'DE89 3704 0044 0532 0130 91'
  }, {
    id: 3,
    date: '2019-05-01',
    subject: 'Rent May',
    amount: '500',
    IBAN: 'DE89 3704 0044 0532 0130 91'
  }
];

describe('InvoiceEffects', () => {
  let service: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InvoiceEffects
      ]
    });
    service = jasmine.createSpyObj('svc', ['findAll', 'findById', 'update', 'insert', 'delete']);
  });

  describe('getAllInvoices$', () => {
    it('should return a GET_INVOICES_SUCCESS action, with the invoices, on success', () => {
      service.findAll.and.returnValue(Observable.of(MOCK_DATA));
      const source = cold('a', {a: {type: GET_INVOICES}});
      const effects = new InvoiceEffects(new Actions(source), service);
      const expected = cold('a', {a: new GetAllInvoicesSuccess(MOCK_DATA)});

      expect(effects.getAllInvoices$).toBeObservable(expected);
    });

    it('should return a GET_INVOICES_ERROR action, with the error', () => {
      const error = new Error('Error loading invoices');
      service.findAll.and.returnValue(Observable.throw(error));

      const source = cold('a', {a: {type: GET_INVOICES}});
      const effects = new InvoiceEffects(new Actions(source), service);

      effects.getAllInvoices$.subscribe(result => {
        expect(result).toEqual(new GetAllInvoicesError(error));
      });
    });
  });

  describe('GetInvoice$', () => {
    it('should return a GET_INVOICE_SUCCESS action, with the invoice found, on success', () => {
      const data = MOCK_DATA[0];
      service.findById.and.returnValue(Observable.of(data));
      const source = cold('a', {a: {type: GET_INVOICE}});
      const effects = new InvoiceEffects(new Actions(source), service);
      const expected = cold('a', {a: new GetInvoiceSuccess(data)});

      expect(effects.getInvoice$).toBeObservable(expected);
    });

    it('should return a GET_INVOICE_ERROR action, with the error', () => {
      const data = MOCK_DATA[0];
      const error = new Error(`Error loading the invoice with id ${data.id}`);
      service.findById.and.returnValue(Observable.throw(error));

      const source = cold('a', {a: {type: GET_INVOICE}});
      const effects = new InvoiceEffects(new Actions(source), service);

      effects.getInvoice$.subscribe(result => {
        expect(result).toEqual(new GetInvoiceError(error));
      });
    });
  });

  describe('UpdateInvoice$', () => {
    it('should return a UPDATE_INVOICE_SUCCESS action, without any data', () => {
      const data = {...MOCK_DATA[0], description: 'Description updated'};
      service.update.and.returnValue(Observable.of(data));
      const source = cold('a', {a: {type: UPDATE_INVOICE}});
      const effects = new InvoiceEffects(new Actions(source), service);
      const expected = cold('a', {a: new UpdateInvoiceSuccess()});

      expect(effects.updateInvoice$).toBeObservable(expected);
    });

    it('should return a UPDATE_INVOICE_ERROR action, with the error', () => {
      const data = {...MOCK_DATA[0], description: 'Description updated'};
      const error = new Error(`Error updating the invoice with id ${data.id}`);
      service.update.and.returnValue(Observable.throw(error));

      const source = cold('a', {a: {type: UPDATE_INVOICE}});
      const effects = new InvoiceEffects(new Actions(source), service);

      effects.updateInvoice$.subscribe(result => {
        expect(result).toEqual(new UpdateInvoiceError(error));
      });
    });
  });

  describe('createInvoice$', () => {
    it('should return a   CREATE_INVOICE_SUCCESS action, with the invoice inserted, on success', () => {
      const data = {
        id: 3,
        date: '2019-04-01',
        subject: 'Rent April',
        amount: '500',
        IBAN: 'DE89 3704 0044 0532 0130 91'
      };
      service.insert.and.returnValue(Observable.of(data));
      const source = cold('a', {a: {type:   CREATE_INVOICE}});
      const effects = new InvoiceEffects(new Actions(source), service);
      const expected = cold('a', {a: new AddInvoiceSuccess(data.id)});

      expect(effects.createInvoice$).toBeObservable(expected);
    });

    it('should return a   CREATE_INVOICE_ERROR action, with the error', () => {
      const data = {
        id: 3,
        date: '2019-04-01',
        subject: 'Rent April',
        amount: '500',
        IBAN: 'DE89 3704 0044 0532 0130 91'
      };
      const error = new Error(`Error adding new invoice with id ${data.id}`);
      service.insert.and.returnValue(Observable.throw(error));

      const source = cold('a', {a: {type:   CREATE_INVOICE}});
      const effects = new InvoiceEffects(new Actions(source), service);

      effects.createInvoice$.subscribe(result => {
        expect(result).toEqual(new AddInvoiceError(error));
      });
    });
  });

  describe('RemoveInvoice$', () => {
    it('should return a DELETE_INVOICE_SUCCESS action, with the invoice deleted, on success', () => {
      const data = MOCK_DATA[1];
      service.delete.and.returnValue(Observable.of(data));
      const source = cold('a', {a: {type: DELETE_INVOICE}});
      const effects = new InvoiceEffects(new Actions(source), service);
      const expected = cold('a', {a: new RemoveInvoiceSuccess(data)});

      expect(effects.removeInvoice$).toBeObservable(expected);
    });

    it('should return a DELETE_INVOICE_ERROR action, with the error', () => {
      const data = MOCK_DATA[1];
      const error = new Error(`Error removing the invoice with id ${data.id}`);
      service.delete.and.returnValue(Observable.throw(error));

      const source = cold('a', {a: {type: DELETE_INVOICE}});
      const effects = new InvoiceEffects(new Actions(source), service);

      effects.removeInvoice$.subscribe(result => {
        expect(result).toEqual(new RemoveInvoiceError(error));
      });
    });
  });
});
