"use client";

import { useMemo, useState } from "react";
import {
  CombinationResult,
  parseCandidates,
  sumOfCombinationLengths
} from "../lib/combinationSum";

const defaultCandidates = "2, 3, 6, 7";
const defaultTarget = 7;

export default function Home() {
  const [rawCandidates, setRawCandidates] = useState(defaultCandidates);
  const [target, setTarget] = useState<number>(defaultTarget);
  const [result, setResult] = useState<CombinationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parsedCandidates = useMemo(() => {
    try {
      return parseCandidates(rawCandidates);
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }
      return "Unable to parse candidates.";
    }
  }, [rawCandidates]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      if (typeof parsedCandidates === "string") {
        throw new Error(parsedCandidates);
      }

      if (!Number.isInteger(target) || target <= 0) {
        throw new Error("Target must be a positive integer.");
      }

      const computation = sumOfCombinationLengths({
        candidates: parsedCandidates,
        target
      });

      setResult(computation);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      setResult(null);
    }
  };

  return (
    <main>
      <section>
        <h1>Combination Sum Lengths</h1>
        <p>
          Enter distinct candidate numbers and a target to compute the total number of
          elements used across all unique combinations that sum to the target.
        </p>
        <form onSubmit={onSubmit}>
          <div className="input-group">
            <label htmlFor="candidates">Candidates</label>
            <textarea
              id="candidates"
              value={rawCandidates}
              onChange={(event) => setRawCandidates(event.target.value)}
              spellCheck={false}
              placeholder="e.g. 2, 3, 6, 7"
            />
            {typeof parsedCandidates === "string" ? (
              <p role="alert">{parsedCandidates}</p>
            ) : null}
          </div>

          <div className="input-group">
            <label htmlFor="target">Target</label>
            <input
              id="target"
              type="number"
              min={1}
              value={target}
              onChange={(event) => setTarget(Number(event.target.value))}
            />
          </div>

          <button type="submit">Compute</button>
        </form>

        {error ? (
          <div className="result-card" role="alert">
            <h2>Computation failed</h2>
            <p>{error}</p>
          </div>
        ) : null}

        {result ? (
          <div className="result-card">
            <h2>Result</h2>
            <p>
              <span className="code-inline">sumOfLengths</span> = {result.sumOfLengths}
            </p>
            <p>Valid combinations:</p>
            <pre>{JSON.stringify(result.combinations, null, 2)}</pre>
          </div>
        ) : null}
      </section>
    </main>
  );
}
