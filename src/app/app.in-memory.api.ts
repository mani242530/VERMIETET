import {InMemoryDbService} from 'angular-in-memory-web-api';
export class AppInMemoryApi implements InMemoryDbService {
    createDb() {
        return {
            'invoices': [
                {
                  'id': 1,
                  'date': '2018-07-01',
                  'subject': 'Rent July',
                  'amount': '500',
                  'IBAN': 'DE89 3704 0044 0532 0130 00',
                },
                {
                  'id': 2,
                  'date': '2018-08-01',
                  'subject': 'Rent August',
                  'amount': '500',
                  'IBAN': 'DE89 3704 0044 0532 0130 11',
                },
                {
                  'id': 3,
                  'date': '2018-09-01',
                  'subject': 'Rent September',
                  'amount': '500',
                  'IBAN': 'DE89 3704 0044 0532 0130 21',
                },
                {
                  'id': 4,
                  'date': '2018-10-02',
                  'subject': 'Rent October',
                  'amount': '500',
                  'IBAN': 'DE89 3704 0044 0532 0130 31'
                },
                {
                  'id': 5,
                  'date': '2018-11-04',
                  'subject': 'Rent November',
                  'amount': '500',
                  'IBAN': 'DE89 3704 0044 0532 0130 41'
                },
                {
                  'id': 6,
                  'date': '2018-12-03',
                  'subject': 'Rent Decemeber',
                  'amount': '500',
                  'IBAN': 'DE89 3704 0044 0532 0130 51'
                },
                {
                  'id': 7,
                  'date': '2019-02-01',
                  'subject': 'Rent January',
                  'amount': '500',
                  'IBAN': 'DE89 3704 0044 0532 0130 61'
                },
                {
                  'id': 8,
                  'date': '2019-02-01',
                  'subject': 'Rent Febury',
                  'amount': '500',
                  'IBAN': 'DE89 3704 0044 0532 0130 71'
                },
                {
                  'id': 9,
                  'date': '2019-03-01',
                  'subject': 'Rent March',
                  'amount': '500',
                  'IBAN': 'DE89 3704 0044 0532 0130 81'
                },
                {
                  'id': 10,
                  'date': '2019-04-01',
                  'subject': 'Rent April',
                  'amount': '500',
                  'IBAN': 'DE89 3704 0044 0532 0130 91'
                }
              ]
        };
    }
}
