import type { TSchema } from 'stnl';
import validateJson from 'stnl/compilers/validate-json.js';

import { createAsyncScope, createEmptyContext, setMinimumHolders, type MiddlewareState } from '@mapl/app/compiler/middleware.js';
import { CTX, HOLDER_0, REQ, RET_400 } from '@mapl/app/constants.js';
import type { AppCompilerState } from '@mapl/app/types/compiler.js';
import { invalidBodyException } from './exception.js';

export default (schema: TSchema, ctx: MiddlewareState, state: AppCompilerState): void => {
  createAsyncScope(ctx);
  setMinimumHolders(ctx, 1);

  // Check the body
  ctx[0] += `${HOLDER_0}=await ${REQ}.json().catch(()=>{});if(${
    validateJson(schema, HOLDER_0, state.declarationBuilders as string[])
  }){${
    // eslint-disable-next-line
    (ctx[4][invalidBodyException[1]] ?? ctx[4][0])?.(ctx[1] === null, true) ?? RET_400
  }}`;

  // Set the body
  createEmptyContext(ctx);
  ctx[0] += `${CTX}.body=${HOLDER_0};`;
};
