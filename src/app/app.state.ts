import * as fromInvoices from './invoices/store/invoices.reducers';

export interface AppState {
  invoices: fromInvoices.State;
}
