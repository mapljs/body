import * as d from './scripts/constants.js';

// Zero-cost constants at runtime
declare global {
  const constants: typeof d;
}
