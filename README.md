# VERMIETET

This application display a list of invoices will create, update and delete using http services (through **HttpClient**) and **@ngrx/store and @ngrx/effects** libraries grouping information by modules. The **ngrx** is a Redux inspired library created for Angular to manage the state changes.

# Getting Started
To start using the application follow the next steps:

## Get the Code
```
git clone https://github.com/mani242530/VERMIETET.git
cd MYHAMMER
npm i
or
npm install
```
## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`.

## Architecture

## How to GET a list of all invoices:
1. To get a list of invoices, the system **dispatch** an event with the action **"GET_INVOICES"**.
2. The **reducer** related to the module **invoices** is executed and listed of invoices.
3. An **“ngrx effect”** class is implemented (invoiceEffects) by module and will be triggered when we dispatch actions with the store.
4. By using some selectors defined in my **reducer** class, we can monitor the success of each action and exceute some specific code after that.

## Structure
- In module we have a folder **store** where will be saved the **actions** (invoices.actions.ts), **effects** (invoices.effects.ts) and **reducers** (invoices.reducers.ts).

- In the module class (invoices.module.ts) are imported the reducers to be called by each feature using the class **StoreModule** and also the **EffectsModule**.

## Functionalities
1. When application is loaded, It will display list of invoices.
2. Click on `view icon` to navigate to invoice detail page.
3. In invoice detail page, It will display description of invoice.

```
# Useful Commands

## Build

Run `npm build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `npm  test` to execute the unit tests using jasmine and karma.

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests using protractor.

## Running lint

Run `npm  lint` to execute and check coding standards as defined in tslint.json.
