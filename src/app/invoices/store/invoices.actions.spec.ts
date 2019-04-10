import {
    GetAllInvoices,
    GET_INVOICES,
    GET_INVOICES_SUCCESS,
    GetAllInvoicesSuccess,
    GetAllInvoicesError,
    GET_INVOICES_ERROR,
    GetInvoice,
    GET_INVOICE,
    GetInvoiceSuccess,
    GET_INVOICE_SUCCESS,
    GetInvoiceError,
    GET_INVOICE_ERROR,
    AddInvoice,
    CREATE_INVOICE,
    AddInvoiceSuccess,
    CREATE_INVOICE_SUCCESS,
    CREATE_INVOICE_ERROR,
    AddInvoiceError,
    RemoveInvoice,
    DELETE_INVOICE,
    RemoveInvoiceSuccess,
    DELETE_INVOICE_SUCCESS,
    DELETE_INVOICE_ERROR,
    RemoveInvoiceError,
    UpdateInvoice,
    UPDATE_INVOICE,
    UpdateInvoiceSuccess,
    UPDATE_INVOICE_ERROR,
    UpdateInvoiceError,
    UPDATE_INVOICE_SUCCESS
} from './invoices.actions';
import {Invoice} from '../shared/invoice';

const MOCK_DATA: Invoice[] = [
    {
        id: 3,
        date: '2018-09-01',
        subject: 'Rent September',
        amount: '',
        IBAN: 'DE89 3704 0044 0532 0130 91'
    }, {
        id: 3,
        date: '2019-02-01',
        subject: 'Rent Febuaray',
        amount: '',
        IBAN: 'DE89 3704 0044 0532 0130 91'
    }
];
/****************************************
 * GET all the invoices
 ****************************************/
describe('Load All Invoices ACTION', () => {
    it('should create the action GET_INVOICES', () => {
        const action = new GetAllInvoices();
        expect({...action}).toEqual({type: GET_INVOICES});
    });
    it('should create the action GET_INVOICES_SUCCESS', () => {
        const payload = [...MOCK_DATA];
        const action = new GetAllInvoicesSuccess(payload);
        expect({...action}).toEqual({type: GET_INVOICES_SUCCESS, payload});
    });
    it('should create the action GET_INVOICES_ERROR', () => {
        const payload = new Error('Error loading all invoices');
        const action = new GetAllInvoicesError(payload);
        expect({...action}).toEqual({
            type: GET_INVOICES_ERROR, payload
        });
    });
});
/****************************************
 * GET inovice by id
 ****************************************/
describe('Load specific Inovice ACTION', () => {
    it('should create the action GET_INVOICE', () => {
        const payload = MOCK_DATA[0].id;
        const action = new GetInvoice(payload);
        expect({...action}).toEqual({ type: GET_INVOICE, payload });
    });
    it('should create the action GET_INVOICE_SUCCESS', () => {
        const payload = MOCK_DATA[0];
        const action = new GetInvoiceSuccess(payload);
        expect({...action}).toEqual({ type: GET_INVOICE_SUCCESS, payload });
    });
    it('should create the action GET_INVOICE_ERROR', () => {
        const payload = new Error('Error loading the inovice');
        const action = new GetInvoiceError(payload);
        expect({...action}).toEqual({
            type: GET_INVOICE_ERROR, payload
        });
    });
});

/****************************************
 * ADD new inovice
 ****************************************/
describe('Create new Inovice ACTION', () => {
    it('should create the action CREATE_INVOICE', () => {
        const payload = MOCK_DATA[1];
        const action = new AddInvoice(payload);
        expect({...action}).toEqual({
            type: CREATE_INVOICE, payload
        });
    });
    it('should create the action CREATE_INVOICE_SUCCESS', () => {
        const payload = MOCK_DATA[1].id;
        const action = new AddInvoiceSuccess(payload);
        expect({...action}).toEqual({ type: CREATE_INVOICE_SUCCESS, payload });
    });
    it('should create the action CREATE_INVOICE_ERROR', () => {
        const payload = new Error('Error while adding a new inovice');
        const action = new AddInvoiceError(payload);
        expect({...action}).toEqual({ type: CREATE_INVOICE_ERROR, payload });
    });
});
/****************************************
 * REMOVE a inovice by id
 ****************************************/
describe('Remove a Inovice ACTION', () => {
    it('should create the action DELETE_INVOICE', () => {
        const payload = MOCK_DATA[1].id;
        const action = new RemoveInvoice(payload);
        expect({...action}).toEqual({ type: DELETE_INVOICE, payload });
    });
    it('should create the action DELETE_INVOICE_SUCCESS', () => {
        const payload = MOCK_DATA[1];
        const action = new RemoveInvoiceSuccess(payload);
        expect({...action}).toEqual({ type: DELETE_INVOICE_SUCCESS, payload });
    });
    it('should create the action DELETE_INVOICE_ERROR', () => {
        const payload = new Error('Error removing inovice.');
        const action = new RemoveInvoiceError(payload);
        expect({...action}).toEqual({ type: DELETE_INVOICE_ERROR, payload });
    });
});
/****************************************
 * UPDATE inovice by id
 ****************************************/
describe('Update a Inovice ACTION', () => {
    it('should create the action UPDATE_INVOICE', () => {
        const payload = MOCK_DATA[0];
        const action = new UpdateInvoice(payload);
        expect({...action}).toEqual({ type: UPDATE_INVOICE, payload });
    });
    it('should create the action UPDATE_INVOICE_SUCCESS', () => {
        const action = new UpdateInvoiceSuccess();
        expect({...action}).toEqual({type: UPDATE_INVOICE_SUCCESS});
    });
    it('should create the action UPDATE_INVOICE_ERROR', () => {
        const payload = new Error('Error updating inovice.');
        const action = new UpdateInvoiceError(payload);
        expect({...action}).toEqual({
            type: UPDATE_INVOICE_ERROR, payload
        });
    });
});
