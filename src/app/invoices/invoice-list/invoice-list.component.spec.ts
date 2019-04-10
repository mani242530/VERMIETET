import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceListComponent} from './invoice-list.component';
import {BrowserModule, By} from '@angular/platform-browser';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Store, StoreModule} from '@ngrx/store';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {InvoicesService} from '../shared/invoices.service';
import {MockStore} from '../store/mock-store';

describe('InvoiceListComponent', () => {
  let component: InvoiceListComponent;
  let fixture: ComponentFixture<InvoiceListComponent>;

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
        InvoiceListComponent
      ],
      providers: [
        InvoicesService,
        {provide: APP_BASE_HREF, useValue: '/'},
        {
          provide: Store, useValue: new MockStore({
          invoices: {
            data: [
              {
                id: 3,
                date: '2018-09-01',
                subject: 'Rent September',
                amount: '500',
                IBAN: 'DE89 3704 0044 0532 0130 91'
                }, {
                  id: 3,
                  date: '2018-10-01',
                  subject: 'Rent November',
                  amount: '500',
                  IBAN: 'DE89 3704 0044 0532 0130 91'
                }
            ],
            selected: null,
            action: 'GET_INVOICES',
            done: true
          }
        })
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'List of Invoices'`, () => {
    expect(component.title).toEqual('List of Invoices');
  });
});
