import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('strict winner', () => {
  assert.deepEqual(
    api.schulze(
      ['a', 'b'],
      [
        ['a', 'b'],
        ['a', 'b'],
        ['b', 'a'],
      ],
    ).winners,
    ['a'],
  );
});
test('cycle all equal', () => {
  assert.deepEqual(
    api.schulze(
      ['a', 'b', 'c'],
      [
        ['a', 'b', 'c'],
        ['b', 'c', 'a'],
        ['c', 'a', 'b'],
      ],
    ).winners,
    ['a', 'b', 'c'],
  );
});
test('winning path through intermediary', () => {
  const r = api.schulze(
    ['a', 'b', 'c'],
    [
      ['a', 'b', 'c'],
      ['a', 'b', 'c'],
      ['b', 'c', 'a'],
    ],
  );
  assert.ok(r.strengths[0][2] >= r.strengths[0][1]);
});
test('unknown and duplicate candidates', () => {
  assert.throws(() => api.schulze(['a', 'a'], [['a', 'a']]));
  assert.throws(() => api.schulze(['a', 'b'], [['a', 'c']]));
});
test('missing and repeated ranks', () => {
  assert.throws(() => api.schulze(['a', 'b'], [['a']]));
  assert.throws(() => api.schulze(['a', 'b'], [['a', 'a']]));
});
test('empty and sparse ballot rejection', () => {
  assert.throws(() => api.schulze(['a', 'b'], []));
  assert.throws(() => api.schulze(['a', 'b'], [[, 'a']]));
});
