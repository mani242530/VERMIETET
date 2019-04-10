import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import {GetInvoice} from '../store/invoices.actions';
import {Observable} from 'rxjs/Observable';
import {Invoice} from '../shared/invoice';
import * as invoiceActions from '../store/invoices.actions';
import {getInvoice} from '../store/invoices.reducers';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {
  title = 'Invoice Details';
  invoice: Observable<Invoice>;

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetInvoice(+params['id']));
    });
    this.invoice = this.store.select(getInvoice);
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
