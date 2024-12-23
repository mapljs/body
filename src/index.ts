import type { TSchema } from 'stnl';
import type { GenericMacro, SchemaMacro, StreamMacro } from './types.js';

export * from './exception.js';
export type * from './types.js';

// Don't re-parse the body ever
const hash = Symbol();

/**
 * Create the JSON body validator macro
 * @param schema
 */
export const json = <T extends TSchema>(schema: T): SchemaMacro<T> => ({
  loadSource: `${import.meta.dir}/json.js`,
  options: schema,
  hash
} as SchemaMacro<T>);

/**
 * A text body parser macro
 */
export const text = {
  loadSource: `${import.meta.dir}/generic.js`,
  options: 'text',
  hash
} as GenericMacro<'text'>;

/**
 * A arrayBuffer body parser macro
 */
export const arrayBuffer = {
  loadSource: `${import.meta.dir}/generic.js`,
  options: 'arrayBuffer',
  hash
} as GenericMacro<'arrayBuffer'>;

/**
 * A bytes body parser macro
 */
export const bytes = {
  loadSource: `${import.meta.dir}/generic.js`,
  options: 'bytes',
  hash
} as GenericMacro<'bytes'>;

/**
 * A blob body parser macro
 */
export const blob = {
  loadSource: `${import.meta.dir}/generic.js`,
  options: 'blob',
  hash
} as GenericMacro<'blob'>;

/**
 * A blob body parser macro
 */
export const stream = {
  loadSource: `${import.meta.dir}/stream.js`,
  options: null,
  hash
} as StreamMacro;
