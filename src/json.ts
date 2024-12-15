import type { TSchema } from 'stnl';
import validateJson from 'stnl/compilers/validate-json.js';

import { createAsyncScope, createEmptyContext, createHolder, type MiddlewareState } from '@mapl/app/compiler/middleware.js';
import { CTX, HOLDER, REQ, RET_400 } from '@mapl/app/constants.js';
import type { AppCompilerState } from '@mapl/app/types/compiler.js';
import { invalidBodyException } from './exception.js';

export default (schema: TSchema, ctx: MiddlewareState, state: AppCompilerState): void => {
  const builder: string[] = [];
  createAsyncScope(ctx);

  // Check the body
  ctx[0] += `${createHolder(ctx)}=await ${REQ}.json().catch(()=>{});if(`;
  validateJson(schema, HOLDER, builder, state.declarationBuilders as any);
  ctx[0] += builder.join('');
  ctx[0] += ')';
  // eslint-disable-next-line
  ctx[0] += (ctx[4][invalidBodyException[1]] ?? ctx[4][0])?.(ctx[1] === null, true) ?? RET_400;

  // Set the body
  createEmptyContext(ctx);
  ctx[0] += `${CTX}.body=${HOLDER};`;
};
