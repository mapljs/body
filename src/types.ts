import type { Macro } from '@mapl/app/macro.js';
import type { Router } from '@mapl/app';
import type { InferSchema, TSchema } from 'stnl';

export type SchemaMacro<T extends TSchema> = Macro<T, Router<{ body: InferSchema<T> }, [], []>>;

export interface GenericMacroMap {
  text: string;
  arrayBuffer: ArrayBuffer;
  bytes: Uint8Array;
  blob: Blob;
}
export type GenericMacro<T extends keyof GenericMacroMap> = Macro<T, Router<{ body: GenericMacroMap[T] }, [], []>>;

export type StreamMacro = Macro<null, Router<{ body: ReadableStream }, [], []>>;
