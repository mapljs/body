# `@mapl/body`
Body parsers for `@mapl/app`.

## JSON parser
JSON parser requires a [`stnl`](https://www.npmjs.com/package/stnl) schema for validation.
```ts
import { json } from '@mapl/body';

app
  // Set the type for the request body
  .macro(json({
    props: {
      name: {
        type: 'string',
        minLength: 3,
        maxLength: 32
      },
      age: 'i8'
    }
  }))
  // Return the username with age from the request body
  .post('/name', (c) => `${c.body.name} - ${c.body.age}`);
```

## Other parsers
These parsers don't require a schema for validation.
```ts
import { stream } from '@mapl/body';

// Parse body to ReadableStream
app.macro(stream);
```

## Exception handling
Register a handler to be get executed when the body payload is invalid:
```ts
import { invalidBodyException } from '@mapl/body';

app.catch(invalidBodyException, (c) => {
  c.status = 400;
  return 'Invalid body payload';
});
```
