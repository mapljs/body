import { createEmptyContext, setMinimumHolders, type MiddlewareState } from '@mapl/app/compiler/middleware.js';
import { CTX, HOLDER_0, REQ, RET_400 } from '@mapl/app/constants.js';
import { invalidBodyException } from './exception.js';

export default (_: null, ctx: MiddlewareState): void => {
  setMinimumHolders(ctx, 1);

  // Check the body
  ctx[0] += `${HOLDER_0}=${REQ}.body;if(${HOLDER_0}===null){${
    // eslint-disable-next-line
    (ctx[4][invalidBodyException[1]] ?? ctx[4][0])?.(ctx[1] === null, true) ?? RET_400
  }}`;

  // Set the body
  createEmptyContext(ctx);
  ctx[0] += `${CTX}.body=${HOLDER_0};`;
};
