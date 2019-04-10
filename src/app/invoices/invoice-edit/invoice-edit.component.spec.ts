import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceEditComponent} from './invoice-edit.component';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Store, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {InvoicesService} from '../shared/invoices.service';
import {MockStore} from '../store/mock-store';

describe('InvoiceEditComponent', () => {
  let component: InvoiceEditComponent;
  let fixture: ComponentFixture<InvoiceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        StoreModule.forRoot([]),
        EffectsModule
      ],
      declarations: [
        InvoiceEditComponent
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
              date: '2018-06-01',
              subject: 'Rent July',
              amount: '500',
              IBAN: 'DE89 3704 0044 0532 0130 91'
              },
            action: 'UPDATE_INVOICE',
            done: true
          }
        })
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'Invoice'`, () => {
    expect(component.title).toEqual('Invoice');
  });

});
