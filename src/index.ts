import type { TSchema } from 'stnl';
import type { TMacro } from './types.js';

export * from './exception.js';
export type * from './types.js';

/**
 * Create the JSON request validator macro
 * @param schema
 */
export const json = <T extends TSchema>(schema: T): TMacro<T> => ({
  loadSource: `${import.meta.dir}/json.js`, options: schema
} as TMacro<T>);
