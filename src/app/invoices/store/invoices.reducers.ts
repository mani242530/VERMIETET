import * as invoiceActions from './invoices.actions';
import {AppAction} from '../../app.action';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Invoice} from '../shared/invoice';

export interface State {
  data: Invoice[];
  selected: Invoice;
  action: string;
  done: boolean;
  error?: Error;
}

const initialState: State = {
  data: [],
  selected: null,
  action: null,
  done: false,
  error: null
};

export function reducer(state = initialState, action: AppAction): State {
  // ...state create immutable state object
  switch (action.type) {
      /*************************
     * GET all invoices actions
     ************************/
    case invoiceActions.GET_INVOICES:
      return {
        ...state,
        action: invoiceActions.GET_INVOICES,
        done: false,
        selected: null,
        error: null
      };
    case invoiceActions.GET_INVOICES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        done: true,
        selected: null,
        error: null
      };
    case invoiceActions.GET_INVOICES_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };

      /*************************
     * GET invoice by id actions
     ************************/
    case invoiceActions.GET_INVOICE:
      return {
        ...state,
        action: invoiceActions.GET_INVOICE,
        done: false,
        selected: null,
        error: null
      };
    case invoiceActions.GET_INVOICE_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        done: true,
        error: null
      };
    case invoiceActions.GET_INVOICE_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

      /*************************
     * CREATE invoice actions
     ************************/
    case invoiceActions.CREATE_INVOICE:
      return {
        ...state,
        selected: action.payload,
        action: invoiceActions.CREATE_INVOICE,
        done: false,
        error: null
      };
    case invoiceActions.CREATE_INVOICE_SUCCESS:
      {
        const newInvoice = {
          ...state.selected,
          id: action.payload
        };
        const data = [
          ...state.data,
          newInvoice
        ];
        return {
          ...state,
          data,
          selected: null,
          error: null,
          done: true
        };
      }
    case invoiceActions.CREATE_INVOICE_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

      /*************************
     * UPDATE invoice actions
     ************************/
    case invoiceActions.UPDATE_INVOICE:
      return {
        ...state,
        selected: action.payload,
        action: invoiceActions.UPDATE_INVOICE,
        done: false,
        error: null
      };
    case invoiceActions.UPDATE_INVOICE_SUCCESS:
      {
        const index = state
          .data
          .findIndex(h => h.id === state.selected.id);
        if (index >= 0) {
          const data = [
            ...state.data.slice(0, index),
            state.selected,
            ...state.data.slice(index + 1)
          ];
          return {
            ...state,
            data,
            done: true,
            selected: null,
            error: null
          };
        }
        return state;
      }
    case invoiceActions.UPDATE_INVOICE_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };

      /*************************
     * DELETE invoice actions
     ************************/
    case invoiceActions.DELETE_INVOICE:
      {
        const selected = state.data.find(h => h.id === action.payload);
        return {
          ...state,
          selected,
          action: invoiceActions.DELETE_INVOICE,
          done: false,
          error: null
        };
      }
    case invoiceActions.DELETE_INVOICE_SUCCESS:
      {
        const data = state.data.filter(h => h.id !== state.selected.id);
        return {
          ...state,
          data,
          selected: null,
          error: null,
          done: true
        };
      }
    case invoiceActions.DELETE_INVOICE_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };
  }
  return state;
}

/*************************
 * SELECTORS
 ************************/
export const getInvoicesState = createFeatureSelector < State > ('invoices');
export const getAllInvoices = createSelector(getInvoicesState, (state: State) => state.data);
export const getInvoice = createSelector(getInvoicesState, (state: State) => {
  if (state.action === invoiceActions.GET_INVOICE && state.done) {
    return state.selected;
  } else {
    return null;
  }

});
export const isDeleted = createSelector(getInvoicesState, (state: State) =>
  state.action === invoiceActions.DELETE_INVOICE && state.done && !state.error);
export const isCreated = createSelector(getInvoicesState, (state: State) =>
 state.action === invoiceActions.CREATE_INVOICE && state.done && !state.error);
export const isUpdated = createSelector(getInvoicesState, (state: State) =>
 state.action === invoiceActions.UPDATE_INVOICE && state.done && !state.error);

export const getDeleteError = createSelector(getInvoicesState, (state: State) => {
  return state.action === invoiceActions.DELETE_INVOICE
    ? state.error
   : null;
});
export const getCreateError = createSelector(getInvoicesState, (state: State) => {
  return state.action === invoiceActions.CREATE_INVOICE
    ? state.error
   : null;
});
export const getUpdateError = createSelector(getInvoicesState, (state: State) => {
  return state.action === invoiceActions.UPDATE_INVOICE
    ? state.error
   : null;
});
export const getInvoicesError = createSelector(getInvoicesState, (state: State) => {
  return state.action === invoiceActions.GET_INVOICES
    ? state.error
   : null;
});
export const getInvoiceError = createSelector(getInvoicesState, (state: State) => {
  return state.action === invoiceActions.GET_INVOICE
    ? state.error
   : null;
});
