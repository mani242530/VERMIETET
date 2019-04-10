import {Component, OnInit} from '@angular/core';
import {Invoice} from '../shared/invoice';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import {GetInvoice, UpdateInvoice} from '../store/invoices.actions';
import {getInvoice} from '../store/invoices.reducers';
import * as invoiceActions from '../store/invoices.actions';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit {
  title = 'Invoice';
  invoice: Invoice;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetInvoice(+params['id']));
    });
    this.store.select(getInvoice).subscribe(invoice => {
      if (invoice != null) {
        this.invoice = invoice;
      }
    });
  }

  /**
   * Create a new invoice
   */
  onSaveInvoice() {
    this.store.dispatch(new UpdateInvoice(this.invoice));
  }

  /**
   * If user is in view mode, back to edit mode else go to invoices page
   */
  onBack() {
    this.router.navigate(['/invoices']);
  }

  /**
   * Reset all fields in the form
   */
  reset() {
    this.invoice.date = '';
    this.invoice.subject = '';
    this.invoice.amount = '';
    this.invoice.IBAN = '';
  }

  /**
   * Delete the selected invoice
   * @param {number} id the invoice id
   */
  delete(id: number) {
    if (confirm('Are you sure do you want to delete this Invoice?')) {
      this.store.dispatch(new invoiceActions.RemoveInvoice(id));
    }
  }

}
