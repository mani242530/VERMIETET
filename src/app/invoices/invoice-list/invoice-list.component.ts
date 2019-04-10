import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {Invoice} from '../shared/invoice';
import {Observable} from 'rxjs/Observable';
import * as invoiceActions from '../store/invoices.actions';
import {getAllInvoices} from '../store/invoices.reducers';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  title = 'List of Invoices';
  invoices: Observable<Invoice[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    console.log('... initializing Invoices list component.');
    this.invoices = this.store.select(getAllInvoices);
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
