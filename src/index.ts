function strictText(value: string, max = 16384): void {
  if (typeof value !== 'string') throw new TypeError('Expected string');
  if (value.length > max) throw new RangeError('Text length budget exceeded');
}
function check(
  candidates: readonly string[],
  ballots: readonly (readonly string[])[],
  complete = true,
): void {
  if (
    !Array.isArray(candidates) ||
    candidates.length < 2 ||
    candidates.length > 50 ||
    !Array.isArray(ballots) ||
    !ballots.length ||
    ballots.length > 10000
  )
    throw new RangeError('Election size bounds');
  const ids = new Set<string>();
  for (const id of candidates) {
    strictText(id, 100);
    if (!id || ids.has(id)) throw new RangeError('Unique nonempty candidates');
    ids.add(id);
  }
  for (const ballot of ballots) {
    if (
      !Array.isArray(ballot) ||
      (complete && ballot.length !== candidates.length) ||
      ballot.length > candidates.length
    )
      throw new RangeError('Ballot length');
    const seen = new Set<string>();
    for (const id of ballot) {
      if (!ids.has(id) || seen.has(id)) throw new RangeError('Unknown or duplicate choice');
      seen.add(id);
    }
  }
}
function pairs(candidates: readonly string[], ballots: readonly (readonly string[])[]): number[][] {
  check(candidates, ballots);
  const n = candidates.length,
    m = Array.from({ length: n }, () => Array<number>(n).fill(0));
  for (const ballot of ballots) {
    const positions = new Map(ballot.map((id, i) => [id, i]));
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        if (positions.get(candidates[i]!)! < positions.get(candidates[j]!)!)
          m[i]![j] = m[i]![j]! + 1;
  }
  return m;
}
function ordinal(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
export function schulze(
  candidates: readonly string[],
  ballots: readonly (readonly string[])[],
): { strengths: number[][]; winners: string[] } {
  const d = pairs(candidates, ballots),
    n = candidates.length,
    p = d.map((row, i) => row.map((v, j) => (i !== j && v > d[j]![i]! ? v : 0)));
  for (let k = 0; k < n; k++)
    for (let i = 0; i < n; i++)
      if (i !== k)
        for (let j = 0; j < n; j++)
          if (j !== i && j !== k) p[i]![j] = Math.max(p[i]![j]!, Math.min(p[i]![k]!, p[k]![j]!));
  const winners = candidates
    .filter((_, i) => candidates.every((_, j) => i === j || p[i]![j]! >= p[j]![i]!))
    .sort(ordinal);
  return { strengths: p, winners };
}
