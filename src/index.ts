import type { TSchema } from 'stnl';
import validateJson from 'stnl/compilers/validate-json.js';

import type { GenericMacro, SchemaMacro, StreamMacro } from './types.js';
export type * from './types.js';

import { createAsyncScope, createEmptyContext, setMinimumHolders, type MiddlewareState } from '@mapl/app/compiler/middleware.js';
import type { AppCompilerState } from '@mapl/app/types/compiler.js';
import { staticException, type StaticException } from '@mapl/app';

export const invalidBodyException: StaticException = staticException();

/**
 * Create the JSON body validator macro
 */
export const json = <T extends TSchema>(options: T): SchemaMacro<T> => ({
  loadSource: (schema: TSchema, ctx: MiddlewareState, state: AppCompilerState): void => {
    createAsyncScope(ctx);
    setMinimumHolders(ctx, 1);

    // Check the body
    ctx[0] += `${constants.HOLDER_0}=await ${constants.REQ}.json().catch(()=>{});if(${
      validateJson(schema, constants.HOLDER_0, state.declarationBuilders as string[])
    }){${
      // eslint-disable-next-line
      (ctx[4][invalidBodyException[1]] ?? ctx[4][0])?.(ctx[1] === null, true) ?? constants.RET_400
    }}`;

    // Set the body
    createEmptyContext(ctx);
    ctx[0] += `${constants.CTX}.body=${constants.HOLDER_0};`;
  },
  options,
  hash: Symbol()
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
  options: 'text',
  hash: Symbol()
} as GenericMacro<'text'>;

/**
 * A arrayBuffer body parser macro
 */
export const arrayBuffer = {
  loadSource: genericLoad,
  options: 'arrayBuffer',
  hash: Symbol()
} as GenericMacro<'arrayBuffer'>;

/**
 * A bytes body parser macro
 */
export const bytes = {
  loadSource: genericLoad,
  options: 'bytes',
  hash: Symbol()
} as GenericMacro<'bytes'>;

/**
 * A blob body parser macro
 */
export const blob = {
  loadSource: genericLoad,
  options: 'blob',
  hash: Symbol()
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
  },
  options: null,
  hash: Symbol()
} as StreamMacro;
