import type { TSchema } from 'stnl';
import validateJson from 'stnl/compilers/validate-json/index.js';

import type { GenericMacro, SchemaMacro, StreamMacro } from './types.js';
export type * from './types.js';

import { createAsyncScope, createEmptyContext, setMinimumHolders, type MiddlewareState } from '@mapl/app/compiler/middleware.js';
import type { AppCompilerState } from '@mapl/app/types/compiler.js';
import { staticException, type StaticException } from '@mapl/app';

export const invalidBodyException: StaticException = staticException();

// Don't recreate the callback
const jsonLoad = (schema: TSchema, ctx: MiddlewareState, state: AppCompilerState): void => {
  createAsyncScope(ctx);
  setMinimumHolders(ctx, 1);

  // Check the body
  ctx[0] += `${constants.HOLDER_0}=await ${constants.REQ}.json().catch(()=>{});if(${validateJson(schema, constants.HOLDER_0, state.declarationBuilders as string[])
  }){${
    // eslint-disable-next-line
    (ctx[4][invalidBodyException[1]] ?? ctx[4][0])?.(ctx[1] === null, true) ?? constants.RET_400
  }}`;

  // Set the body
  createEmptyContext(ctx);
  ctx[0] += `${constants.CTX}.body=${constants.HOLDER_0};`;
};

/**
 * Create the JSON body validator macro
 */
export const json = <T extends TSchema>(options: T): SchemaMacro<T> => ({
  loadSource: jsonLoad,
  options
} as SchemaMacro<T>);

// Load a generic parser
const genericLoad = (parser: string, ctx: MiddlewareState): void => {
  createAsyncScope(ctx);
  setMinimumHolders(ctx, 1);

  // Check the body
  ctx[0] += `${constants.HOLDER_0}=await ${constants.REQ}.${parser}().catch(()=>null);if(${constants.HOLDER_0}===null){${
    // eslint-disable-next-line
    (ctx[4][invalidBodyException[1]] ?? ctx[4][0])?.(ctx[1] === null, true) ?? constants.RET_400
  }}`;

  // Set the body
  createEmptyContext(ctx);
  ctx[0] += `${constants.CTX}.body=${constants.HOLDER_0};`;
};

/**
 * A text body parser macro
 */
export const text = {
  loadSource: genericLoad,
  options: 'text'
} as GenericMacro<'text'>;

/**
 * A arrayBuffer body parser macro
 */
export const arrayBuffer = {
  loadSource: genericLoad,
  options: 'arrayBuffer'
} as GenericMacro<'arrayBuffer'>;

/**
 * A bytes body parser macro
 */
export const bytes = {
  loadSource: genericLoad,
  options: 'bytes'
} as GenericMacro<'bytes'>;

/**
 * A blob body parser macro
 */
export const blob = {
  loadSource: genericLoad,
  options: 'blob'
} as GenericMacro<'blob'>;

/**
 * A blob body parser macro
 */
export const stream = {
  loadSource: (_: null, ctx: MiddlewareState): void => {
    setMinimumHolders(ctx, 1);

    // Check the body
    ctx[0] += `${constants.HOLDER_0}=${constants.REQ}.body;if(${constants.HOLDER_0}===null){${
      // eslint-disable-next-line
      (ctx[4][invalidBodyException[1]] ?? ctx[4][0])?.(ctx[1] === null, true) ?? constants.RET_400
    }}`;

    // Set the body
    createEmptyContext(ctx);
    ctx[0] += `${constants.CTX}.body=${constants.HOLDER_0};`;
  }
} as StreamMacro;
