import type { Macro } from '@mapl/app/macro.js';
import type { Router } from '@mapl/app';
import type { InferSchema, TSchema } from 'stnl';

export type TMacro<T extends TSchema> = Macro<T, Router<{ body: InferSchema<T> }, [], []>>;
