import {NgModule} from '@angular/core';
import {InvoicesService} from './shared/invoices.service';
import {invoicesRoutedComponents, InvoicesRoutingModule} from './invoices-routing.module';
import {SharedModule} from '../shared/shared.module';

// ngrx elements
import {StoreModule, ActionReducerMap} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {InvoiceEffects} from './store/invoices.effects';
import * as invoiceReducer from './store/invoices.reducers';

export const reducers: ActionReducerMap<any> = {
  invoices: invoiceReducer.reducer
};

@NgModule({
  imports: [
    SharedModule,
    InvoicesRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([InvoiceEffects])
  ],
  declarations: [invoicesRoutedComponents],
  providers: [
    InvoicesService]
})
export class InvoicesModule {
}
