near-runner + Jest
==================

A thin wrapper around [near-runner] to make it easier to use with [Jest] and [TypeScript]. If you don't want Jest, use near-runner directly.

Write tests once, run them both on [NEAR TestNet](https://docs.near.org/docs/concepts/networks) and a controlled [NEAR Sandbox](https://github.com/near/sandbox) local environment.


  [near-runner]: https://github.com/near/runner-js
  [Jest]: https://jestjs.io/
  [TypeScript]: https://www.typescriptlang.org/

Quick Start
===========

`near-runner-init` is a one-time command to quickly initialize a project with near-runner-jest. You will need [NodeJS] and optionally [Yarn] installed on your system. Then:

    npx near-runner-init && npm install # npm
    npx near-runner-init && yarn        # Yarn 1

It will:

* Add a `__tests__` directory to your project
* Create a `package.json` file in the tests directory, if none found in project root (not a JS project)
* ...

  [NodeJS]: https://nodejs.dev/
  [Yarn]: https://yarnpkg.com/

Manual Install
==============

1. Install.

   ```bash
   npm install --save-dev near-runner-jest # npm
   yarn add --dev near-runner-jest         # yarn
   ```

2. Initialize.

   Make a `__tests__` folder, make your first test file. near-runner-jest looks for files in this directory with names ending in `*.spec.ts` or `*.test.ts`. Call your first test file `main.spec.js` for now if you're not sure what else to call it.

   Set up a `runner` with NEAR accounts, contracts, and state that will be used in all of your tests.

   ```ts
   import path from 'path';
   import {Runner} from 'near-runner-jest';

   const runner = Runner.create(async ({root}) => {
      const alice = await root.createAccount('alice');
      const contract = await root.createAndDeploy(
        'contract-account-name',
        path.join(__dirname, '..', 'path', 'to', 'compiled.wasm'),
      );

      // make other contract calls that you want as a starting point for all tests

      return {alice, contract};
   });

   describe('my contract', () => {
     // tests go here
   });
   ```

   `describe` is [from Jest](https://jestjs.io/docs/setup-teardown) and is optional.

4. Write tests.

   ```ts
   describe('my contract', () => {
     runner.test('does something', async ({alice, contract}) => {
       await alice.call(
         contract,
         'some_update_function',
         {some_string_argument: 'cool', some_number_argument: 42}
       );
       const result = await contract.view(
         'some_view_function',
         {account_id: alice}
       );
       expect(result).toBe('whatever');
     });

     runner.test('does something else', async ({alice, contract}) => {
       const result = await contract.view(
         'some_view_function',
         {account_id: alice}
       );
       expect(result).toBe('some default');
     });
   });
   ```

   `runner.test` is added to `near-runner` by `near-runner-jest`, and is shorthand for:

   ```ts
   test.concurrent('does something', async () => {
     await runner.run(async ({…}) => {
       // tests go here
     });
   });
   ```

   Where `test.concurrent` comes [from Jest](https://jestjs.io/docs/api#testconcurrentname-fn-timeout) and `runner.run` comes [from near-runner](https://github.com/near/runner-js#how-it-works).

See the [`__tests__`](https://github.com/near/runner-js/tree/main/__tests__) directory in near-runner-js for more examples. Remember that you can replace the nested `test.concurrent`…`await runner.run` sequences with `runner.test` when using near-runner-jest.
