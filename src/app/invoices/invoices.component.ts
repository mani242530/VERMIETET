import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {AppState} from '../app.state';
import {GetAllInvoices} from './store/invoices.actions';
import {
  getCreateError, getDeleteError, getInvoicesError, getUpdateError, isCreated, isDeleted,
  isUpdated
} from './store/invoices.reducers';

@Component({
  selector: 'app-invoices',
  template: `
    <router-outlet></router-outlet>`,
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  constructor(private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    console.log('... Initializing Heroes component');
    this.store.dispatch(new GetAllInvoices());

    // subscriptions when success or error action
    this.store.select(getInvoicesError).subscribe((error) => this.loadingError(error));
    this.store.select(isDeleted).subscribe((done) => {
      this.actionSuccess(done, 'The invoice was deleted successfully!!!');
    });
    this.store.select(getDeleteError).subscribe((error) => {
      this.actionError(error, 'Error while deleting the invoice');
    });
    this.store.select(isUpdated).subscribe((done) => {
      this.actionSuccess(done, 'The invoice was updated successfully!!!');
    });
    this.store.select(getUpdateError).subscribe((error) => {
      this.actionError(error, 'Error while updating the invoice');
    });
    this.store.select(isCreated).subscribe((done) => {
      this.actionSuccess(done, 'The invoice was created successfully!!!');
    });
    this.store.select(getCreateError).subscribe((error) => {
      this.actionError(error, 'Error while creating the invoice');
    });
  }

  /**
   * Display error message if load of invoices fails
   */
  loadingError(error) {
    if (error) {
      alert('Error while loading the list of invoices');
    }
  }

  /**
   * Display success message after execute specific action over the invoice
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      alert(message);
      this.router.navigate(['/invoices']);
    }
  }

  /**
   * Display error message is execution of action fails
   * @param error the error thrown
   * @param message the message to be displayed
   */
  actionError(error, message: string) {
    if (error) {
      alert(message);
    }
  }
}
