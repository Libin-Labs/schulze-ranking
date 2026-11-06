import { schulze } from '@lp-labs/schulze-ranking';
if (schulze(['a', 'b'], [['a', 'b']]).winners[0] !== 'a') throw new Error('Schulze');
// @ts-expect-error invalid argument must be rejected by declarations
schulze([1, 2], [['a', 'b']]);
