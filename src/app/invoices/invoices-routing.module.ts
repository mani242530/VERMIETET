import {NgModule} from '@angular/core';

import {Routes, RouterModule} from '@angular/router';

// components
import {InvoicesComponent} from './invoices.component';
import {InvoiceListComponent} from './invoice-list/invoice-list.component';
import {InvoiceCreateComponent} from './invoice-create/invoice-create.component';
import {InvoiceDetailComponent} from './invoice-detail/invoice-detail.component';
import {InvoiceEditComponent} from './invoice-edit/invoice-edit.component';

export const invoicesRoutes: Routes = <Routes>[{
  path: '',
  component: InvoicesComponent,
  children: [
    {path: '', component: InvoiceListComponent},
    {path: 'detail/:id', component: InvoiceDetailComponent},
    {path: 'create', component: InvoiceCreateComponent},
    {path: 'edit/:id', component: InvoiceEditComponent}
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(invoicesRoutes)
  ],
  exports: [RouterModule]
})
export class InvoicesRoutingModule {
}

export const invoicesRoutedComponents = [
  InvoicesComponent,
  InvoiceListComponent,
  InvoiceDetailComponent,
  InvoiceCreateComponent,
  InvoiceEditComponent
];
