import {Injectable} from '@angular/core';
import {Actions, Effect, toPayload} from '@ngrx/effects';
import * as invoiceActions from './invoices.actions';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {
  AddInvoice, AddInvoiceError, AddInvoiceSuccess,
  GetAllInvoicesError, GetAllInvoicesSuccess,
  GetInvoice, GetInvoiceError, GetInvoiceSuccess,
  RemoveInvoice, RemoveInvoiceError, RemoveInvoiceSuccess,
  UpdateInvoice, UpdateInvoiceError, UpdateInvoiceSuccess
} from './invoices.actions';
import {InvoicesService} from '../shared/invoices.service';
import {Invoice} from '../shared/invoice';

@Injectable()
export class InvoiceEffects {
  constructor(private actions$: Actions,
              private svc: InvoicesService) {
  }

  @Effect()
  getAllInvoices$: Observable<Action> = this.actions$
    .ofType(invoiceActions.GET_INVOICES)
    .switchMap(() => this.svc.findAll())
    .map(heroes => new GetAllInvoicesSuccess(heroes))
    .catch((err) => [new GetAllInvoicesError(err)]);

  @Effect()
  getInvoice$ = this.actions$
    .ofType(invoiceActions.GET_INVOICE)
    .map((action: GetInvoice) => action.payload)
    .switchMap(id => this.svc.findById(id))
    .map(hero => new GetInvoiceSuccess(hero))
    .catch((err) => [new GetInvoiceError(err)]);

  @Effect()
  updateInvoice$ = this.actions$
    .ofType(invoiceActions.UPDATE_INVOICE)
    .map((action: UpdateInvoice) => action.payload)
    .switchMap(invoice => this.svc.update(invoice))
    .map(() => new UpdateInvoiceSuccess())
    .catch((err) => [new UpdateInvoiceError(err)]);

  @Effect()
  createInvoice$ = this.actions$
    .ofType(invoiceActions.CREATE_INVOICE)
    .map((action: AddInvoice) => action.payload)
    .switchMap(newInvoice => this.svc.insert(newInvoice))
    .map((response) => new AddInvoiceSuccess(response.id))
    .catch((err) => [new AddInvoiceError(err)]);

  @Effect()
  removeInvoice$ = this.actions$
    .ofType(invoiceActions.DELETE_INVOICE)
    .map((action: RemoveInvoice) => action.payload)
    .switchMap(id => this.svc.delete(id))
    .map((hero: Invoice) => new RemoveInvoiceSuccess(hero))
    .catch((err) => [new RemoveInvoiceError(err)]);
}
