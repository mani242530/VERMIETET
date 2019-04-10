import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceDetailComponent} from './invoice-detail.component';
import {Router, RouterModule} from '@angular/router';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {InvoicesService} from '../shared/invoices.service';
import {EffectsModule} from '@ngrx/effects';
import {ActionReducerMap, Store, StoreModule} from '@ngrx/store';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import * as invoicesReducer from '../store/invoices.reducers';
import {Invoice} from '../shared/invoice';
import {MockStore} from '../store/mock-store';

export const reducers: ActionReducerMap<any> = {
  invoices: invoicesReducer.reducer
};

describe('InvoiceDetailComponent', () => {
  let component: InvoiceDetailComponent;
  let fixture: ComponentFixture<InvoiceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        EffectsModule.forRoot([])
      ],
      declarations: [
        InvoiceDetailComponent
      ],
      providers: [
        InvoicesService,
        {provide: APP_BASE_HREF, useValue: '/'},
        {
          provide: Store, useValue: new MockStore({
          invoices: {
            data: [],
            selected: {
              id: 3,
              date: '2018=07-01',
              subject: 'Rent August',
              amount: '500',
              IBAN: 'DE89 3704 0044 0532 0130 91'
              },
            action: 'GET_INVOICE',
            done: true
          }
        })
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'Invoice Details'`, () => {
    expect(component.title).toEqual('Invoice Details');
  });
});
