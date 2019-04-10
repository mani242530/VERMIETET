import {Component, OnInit} from '@angular/core';
import {Invoice} from '../shared/invoice';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import {AddInvoice} from '../store/invoices.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.css']
})
export class InvoiceCreateComponent implements OnInit {
  title = 'Create new invoice';
  invoice: Invoice = new Invoice();

  constructor(private router: Router, private store: Store<AppState>) {

  }

  ngOnInit() {
  }

  /**
   * If user is in view mode, back to edit mode else go to invoices page
   */
  onBack() {
    this.router.navigate(['/invoices']);
  }

  /**
   * Create a new invoice
   */
  onSaveInvoice() {
    this.store.dispatch(new AddInvoice(this.invoice));
  }

  reset() {
    this.invoice.date = '';
    this.invoice.subject = '';
    this.invoice.amount = '';
    this.invoice.IBAN = '';
  }
}
