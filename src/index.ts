import type { TSchema } from 'stnl';
import type { GenericMacro, SchemaMacro, StreamMacro } from './types.js';

export * from './exception.js';
export type * from './types.js';

/**
 * Create the JSON body validator macro
 * @param schema
 */
export const json = <T extends TSchema>(schema: T): SchemaMacro<T> => ({
  loadSource: `${import.meta.dir}/json.js`,
  options: schema,
  hash: Symbol()
} as SchemaMacro<T>);

/**
 * A text body parser macro
 */
export const text = {
  loadSource: `${import.meta.dir}/generic.js`,
  options: 'text',
  hash: Symbol()
} as GenericMacro<'text'>;

/**
 * A arrayBuffer body parser macro
 */
export const arrayBuffer = {
  loadSource: `${import.meta.dir}/generic.js`,
  options: 'arrayBuffer',
  hash: Symbol()
} as GenericMacro<'arrayBuffer'>;

/**
 * A bytes body parser macro
 */
export const bytes = {
  loadSource: `${import.meta.dir}/generic.js`,
  options: 'bytes',
  hash: Symbol()
} as GenericMacro<'bytes'>;

/**
 * A blob body parser macro
 */
export const blob = {
  loadSource: `${import.meta.dir}/generic.js`,
  options: 'blob',
  hash: Symbol()
} as GenericMacro<'blob'>;

/**
 * A blob body parser macro
 */
export const stream = {
  loadSource: `${import.meta.dir}/stream.js`,
  options: null,
  hash: Symbol()
} as StreamMacro;
