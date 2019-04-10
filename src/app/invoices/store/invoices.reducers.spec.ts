import {State, reducer} from './invoices.reducers';
import {
    GET_INVOICES,
    GetAllInvoices,
    GetAllInvoicesSuccess,
    GET_INVOICES_ERROR,
    GetAllInvoicesError,
    GetInvoice,
    GET_INVOICE,
    GetInvoiceSuccess,
    GetInvoiceError,
    CREATE_INVOICE,
    CREATE_INVOICE_ERROR,
    AddInvoiceSuccess,
    AddInvoiceError,
    AddInvoice,
    UPDATE_INVOICE,
    UpdateInvoice,
    UpdateInvoiceSuccess,
    UpdateInvoiceError,
    DELETE_INVOICE,
    RemoveInvoice,
    RemoveInvoiceSuccess,
    RemoveInvoiceError
} from './invoices.actions';
import {Invoice} from '../shared/invoice';

const MOCK_DATA: Invoice[] = [
    {
        id: 3,
        date: '2018-04-01',
        subject: 'Rent April',
        amount: '500',
        IBAN: 'DE89 3704 0044 0532 0130 91'
    }, {
        id: 3,
        date: '2018-04-01',
        subject: 'Rent April',
        amount: '500',
        IBAN: 'DE89 3704 0044 0532 0130 91'
    }
];

let state: State = {
    data: [],
    selected: null,
    action: null,
    done: false,
    error: null
};

describe('Load all Invoices REDUCER', () => {
    it('should reduce the action GET_INVOICES', () => {
        const action = new GetAllInvoices();
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            action: GET_INVOICES,
            done: false
        });
        state = newState;
    });
    it('should reduce the action GET_INVOICES_SUCCESS', () => {
        const payload = [...MOCK_DATA];
        const action = new GetAllInvoicesSuccess(payload);
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            data: payload,
            done: true
        });
        state = newState;
    });
    it('should reduce the action GET_INVOICES_ERROR', () => {
        const payload = new Error('Error loading all invoices');
        const action = new GetAllInvoicesError(payload);
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            done: true,
            error: action.payload
        });
    });
});

describe('GET Invoice by id REDUCER', () => {
    it('should reduce the action GET_INVOICE', () => {
        const payload = MOCK_DATA[0].id;
        const action = new GetInvoice(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            action: GET_INVOICE,
            done: false
        });
        state = newState;
    });
    it('should reduce the action GET_INVOICE_SUCCESS', () => {
        const payload = MOCK_DATA[0];
        const action = new GetInvoiceSuccess(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            selected: payload,
            done: true
        });
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action GET_INVOICE_ERROR', () => {
        const payload = new Error('Error loading the invoice');
        const action = new GetInvoiceError(payload);
        const newState = reducer(state, action);
        expect({...newState }).toEqual({
            ...state,
            done: true,
            error: action.payload
        });
    });
});

describe('Create new invoice REDUCER', () => {
    it('should reduce the action CREATE_INVOICE', () => {
        const payload = {
            id: 3,
            date: '2019-03-01',
            subject: 'Rent March',
            amount: '500',
            IBAN: 'DE89 3704 0044 0532 0130 91'
        };
        const action = new AddInvoice(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            selected: payload,
            action: CREATE_INVOICE,
            done: false
        });
        state = newState;
    });
    it('should reduce the action CREATE_INVOICE_SUCCESS', () => {
        const payload = 3;
        const action = new AddInvoiceSuccess(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            data: [
                ...state.data,
                {
                    ...state.selected,
                    id: payload
                }
            ],
            selected: null,
            done: true
        });
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action CREATE_INVOICE_ERROR', () => {
        const payload = new Error('Error creating the invoice');
        const action = new AddInvoiceError(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            selected: null,
            done: true,
            error: payload
        });
    });
});

describe('Update existing invoice REDUCER', () => {
    it('should reduce the action UPDATE_INVOICE', () => {
        const payload = {...MOCK_DATA[0], description: 'Descripion of invoice 1 edited'};
        const action = new UpdateInvoice(payload);
        const newState = reducer(state, action);
        expect({ ...newState}).toEqual({
            ...state,
            selected: payload,
            action: UPDATE_INVOICE,
            done: false
        });
        state = newState;
    });
    it('should reduce the action UPDATE_INVOICE_SUCCESS', () => {
        const index = 0;
        const data = [
            ...state.data.slice(0, index),
            state.selected,
            ...state.data.slice(index + 1)
        ];
        const action = new UpdateInvoiceSuccess();
        const newState = reducer(state, action);
        expect({...newState}).toEqual({...state, data, done: true, selected: null, error: null});
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action UPDATE_INVOICE_ERROR', () => {
        const payload = new Error('Error updating the invoice');
        const action = new UpdateInvoiceError(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({...state, done: true, error: payload});
    });
});

describe('Deleting existing invoice REDUCER', () => {
    it('should reduce the action DELETE_INVOICE', () => {
        const selected = MOCK_DATA[1];
        const payload = selected.id;
        const action = new RemoveInvoice(payload);
        const newState = reducer(state, action);

        expect({ ...newState}).toEqual({
            ...state,
            selected,
            action: DELETE_INVOICE,
            done: false
        });
        state = newState;
    });
    it('should reduce the action DELETE_INVOICE_SUCCESS', () => {
        const payload = MOCK_DATA[1];
        const action = new RemoveInvoiceSuccess(payload);
        const data = state.data.filter(h => h.id !== state.selected.id);
        const newState = reducer(state, action);
        expect({...newState}).toEqual( {...state, data, selected: null, done: true});
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action DELETE_INVOICE_ERROR', () => {
        const payload = new Error('Error while deleting the invoice');
        const action = new RemoveInvoiceError(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({...state, done: true, error: payload});
    });
});
