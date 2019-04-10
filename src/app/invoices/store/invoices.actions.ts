import {Action} from '@ngrx/store';
import {Invoice} from '../shared/invoice';

export const GET_INVOICES = '[ALL] Invoices';
export const GET_INVOICES_SUCCESS = '[ALL] Invoices Success';
export const GET_INVOICES_ERROR = '[ALL] Invoices Error';

export const GET_INVOICE = '[GET] Invoice';
export const GET_INVOICE_SUCCESS = '[GET] Invoices Success';
export const GET_INVOICE_ERROR = '[GET] Invoices Error';

export const CREATE_INVOICE = '[CREATE] Invoice';
export const CREATE_INVOICE_SUCCESS = '[CREATE] Invoice Success';
export const CREATE_INVOICE_ERROR = '[CREATE] Invoice Error';

export const DELETE_INVOICE = '[DELETE] Invoice';
export const DELETE_INVOICE_SUCCESS = '[DELETE] Invoice Success';
export const DELETE_INVOICE_ERROR = '[DELETE] Invoice Error';

export const UPDATE_INVOICE = '[UPDATE] Invoice';
export const UPDATE_INVOICE_SUCCESS = '[UPDATE] Invoice Success';
export const UPDATE_INVOICE_ERROR = '[UPDATE] Invoice Error';

/****************************************
 * GET all the invoices
 ****************************************/
export class GetAllInvoices implements Action {
  readonly type = GET_INVOICES;
}

export class GetAllInvoicesSuccess implements Action {
  readonly type = GET_INVOICES_SUCCESS;

  constructor(public payload: Invoice[]) {
  }
}

export class GetAllInvoicesError implements Action {
  readonly type = GET_INVOICES_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * GET invoice by id
 ****************************************/
export class GetInvoice implements Action {
  readonly type = GET_INVOICE;

  constructor(public payload: number) {
  }
}

export class GetInvoiceSuccess implements Action {
  readonly type = GET_INVOICE_SUCCESS;

  constructor(public payload: Invoice) {
  }
}

export class GetInvoiceError implements Action {
  readonly type = GET_INVOICE_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * ADD new invoice
 ****************************************/
export class AddInvoice implements Action {
  readonly type = CREATE_INVOICE;

  constructor(public payload: Invoice) {
  }
}

export class AddInvoiceSuccess implements Action {
  readonly type = CREATE_INVOICE_SUCCESS;

  constructor(public payload: number) {
  }
}

export class AddInvoiceError implements Action {
  readonly type = CREATE_INVOICE_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * REMOVE a invoice by id
 ****************************************/
export class RemoveInvoice implements Action {
  readonly type = DELETE_INVOICE;

  constructor(public payload: number) {
  }
}

export class RemoveInvoiceSuccess implements Action {
  readonly type = DELETE_INVOICE_SUCCESS;

  constructor(public payload: Invoice) {
  }
}

export class RemoveInvoiceError implements Action {
  readonly type = DELETE_INVOICE_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * UPDATE invoice by id
 ****************************************/
export class UpdateInvoice implements Action {
  readonly type = UPDATE_INVOICE;

  constructor(public payload: Invoice) {
  }
}

export class UpdateInvoiceSuccess implements Action {
  readonly type = UPDATE_INVOICE_SUCCESS;
}

export class UpdateInvoiceError implements Action {
  readonly type = UPDATE_INVOICE_ERROR;

  constructor(public payload: Error) {
  }
}
