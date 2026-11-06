# @lp-labs/schulze-ranking

Schulze winning-votes strongest paths and winner set.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/schulze-ranking
```

## Working example

```js
import { schulze } from '@lp-labs/schulze-ranking';
if (schulze(['a', 'b'], [['a', 'b']]).winners[0] !== 'a') throw new Error('Schulze');
```

CommonJS: `const api = require('@lp-labs/schulze-ranking')`.

## Behavior, customization and limits

Candidate IDs unique nonempty strings<=100chars,2..50; dense ballots1..10000 with every candidate ranked exactly once (no ties or incomplete rankings). Caller candidate order indexes matrices, ordinal ID order resolves reported score ties. Results are headless mathematical counts, not election-law compliance, auditing, voter authentication or political forecasts. schulze returns {strengths,winners}; initialize winning vote edges only where count>reverse, then max-min Floyd-Warshall. Winners are candidates with strength[i][j]>=strength[j][i] for all j, sorted ordinal ID (may multiple). Matrix uses caller order. O(ballots*n squared+n cubed), not unique linear ranking or legal system.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export declare function schulze(
  candidates: readonly string[],
  ballots: readonly (readonly string[])[],
): {
  strengths: number[][];
  winners: string[];
};
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
