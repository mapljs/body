# `@mapl/body`
Body parsers for `@mapl/app`.

```ts
import { json } from '@mapl/body';

router()
  // Set the type for the request body
  .macro(json({
    props: {
      name: {
        type: 'string',
        minLength: 3,
        maxLength: 32
      },
      age: { type: 'int' }
    }
  }))
  // Return the username with age from the request body
  .post('/name', (c) => `${c.body.name} - ${c.body.age}`);
```
