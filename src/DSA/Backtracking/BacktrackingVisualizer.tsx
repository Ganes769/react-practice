import { useState, useRef, useEffect } from "react";
import "./BacktrackingVisualizer.css";

export type BacktrackStepType = "record" | "choose" | "backtrack";

export type BacktrackStep = {
  type: BacktrackStepType;
  path: number[];
  chosen?: number;
  subsetsSoFar: number[][];
  startIndex?: number; // current loop start, for explanation
};

function generateSubsetSteps(arr: number[]): BacktrackStep[] {
  const steps: BacktrackStep[] = [];
  const result: number[][] = [];

  function backtrack(path: number[], start: number) {
    result.push([...path]);
    steps.push({
      type: "record",
      path: [...path],
      subsetsSoFar: result.map((s) => [...s]),
      startIndex: start,
    });

    for (let i = start; i < arr.length; i++) {
      const chosen = arr[i];
      path.push(chosen);
      steps.push({
        type: "choose",
        path: [...path],
        chosen,
        subsetsSoFar: result.map((s) => [...s]),
        startIndex: i,
      });
      backtrack(path, i + 1);
      path.pop();
      steps.push({
        type: "backtrack",
        path: [...path],
        chosen,
        subsetsSoFar: result.map((s) => [...s]),
        startIndex: i + 1,
      });
    }
  }

  backtrack([], 0);
  return steps;
}

const defaultInput = "1 2 3";

export default function BacktrackingVisualizer() {
  const [input, setInput] = useState(defaultInput);
  const [steps, setSteps] = useState<BacktrackStep[]>([]);
  const [stepIndex, setStepIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const arr = input
    .split(/[\s,]+/)
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !isNaN(n));

  const currentStep =
    stepIndex !== null && steps.length > 0 ? steps[stepIndex] : null;

  const runBacktrack = () => {
    if (arr.length < 1 || arr.length > 8) return;
    const newSteps = generateSubsetSteps(arr);
    setSteps(newSteps);
    setStepIndex(0);
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (!isPlaying || steps.length === 0 || stepIndex === null) return;
    if (stepIndex >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }
    intervalRef.current = setInterval(() => {
      setStepIndex((i) => {
        if (i === null || i >= steps.length - 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, speed);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, stepIndex, steps.length, speed]);

  const handlePlayPause = () => {
    if (steps.length === 0) runBacktrack();
    else if (stepIndex !== null && stepIndex >= steps.length - 1) {
      setStepIndex(0);
      setIsPlaying(true);
    } else setIsPlaying((p) => !p);
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSteps([]);
    setStepIndex(null);
    setIsPlaying(false);
  };

  const stepLabel = (s: BacktrackStep) => {
    if (s.type === "record")
      return `Record subset [${s.path.join(", ") || "∅"}]`;
    if (s.type === "choose")
      return `Choose ${s.chosen} → path = [${s.path.join(", ")}]`;
    if (s.type === "backtrack")
      return `Backtrack (remove ${s.chosen}) → path = [${s.path.join(", ") || "∅"}]`;
    return "";
  };

  return (
    <div className="backtrack-container">
      <h1>Backtracking: Subset Generator</h1>
      <p className="backtrack-subtitle">
        Step through the classic <strong>subset</strong> backtracking: at each index we either{" "}
        <strong>choose</strong> the element (add to path) or skip it; after exploring, we{" "}
        <strong>backtrack</strong> (remove from path) and try the next choice.
      </p>

      <div className="backtrack-section">
        <h2>Input array</h2>
        <div className="backtrack-controls">
          <input
            className="backtrack-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 1 2 3 or 5,10,15"
            disabled={steps.length > 0 && stepIndex !== null}
          />
          <button
            className="backtrack-btn primary"
            onClick={runBacktrack}
            disabled={arr.length < 1 || arr.length > 8}
          >
            Generate steps
          </button>
          <button className="backtrack-btn" onClick={reset}>
            Reset
          </button>
        </div>
        {arr.length > 8 && (
          <p className="backtrack-hint">Keep array length between 1 and 8 for clarity.</p>
        )}
      </div>

      {steps.length > 0 && (
        <>
          <div className="backtrack-section">
            <h2>Playback</h2>
            <div className="playback-controls">
              <button
                className="backtrack-btn primary"
                onClick={handlePlayPause}
              >
                {isPlaying ? "Pause" : stepIndex !== null && stepIndex >= steps.length - 1 && steps.length > 1 ? "Restart" : "Play"}
              </button>
              <label className="speed-label">
                Speed (ms):
                <input
                  type="range"
                  min="200"
                  max="1500"
                  step="100"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                />
                <span>{speed}ms</span>
              </label>
            </div>
            <div className="step-slider-wrap">
              <input
                type="range"
                min={0}
                max={Math.max(0, steps.length - 1)}
                value={stepIndex ?? 0}
                onChange={(e) => {
                  setStepIndex(Number(e.target.value));
                  setIsPlaying(false);
                }}
                className="step-slider"
              />
              <span className="step-counter">
                Step {((stepIndex ?? 0) + 1)} / {steps.length}
              </span>
            </div>
          </div>

          <div className="backtrack-section two-cols">
            <div className="backtrack-panel">
              <h2>Current state</h2>
              <div className="array-display">
                <span className="array-label">Input:</span>
                {arr.map((val, idx) => (
                  <span key={idx} className="array-chip">
                    {val}
                  </span>
                ))}
              </div>
              <div className="path-display">
                <span className="path-label">Current path (building subset):</span>
                <div className="path-chips">
                  {(currentStep?.path ?? []).length === 0 ? (
                    <span className="path-empty">∅</span>
                  ) : (
                    (currentStep?.path ?? []).map((v, i) => (
                      <span key={i} className="path-chip">
                        {v}
                      </span>
                    ))
                  )}
                </div>
              </div>
              {currentStep && (
                <div className={`action-badge ${currentStep.type}`}>
                  {currentStep.type === "record" && "📋 Record subset"}
                  {currentStep.type === "choose" && `➕ Choose ${currentStep.chosen}`}
                  {currentStep.type === "backtrack" && `↩ Backtrack (remove ${currentStep.chosen})`}
                </div>
              )}
            </div>

            <div className="backtrack-panel">
              <h2>Subsets found so far</h2>
              <div className="subsets-list">
                {(currentStep?.subsetsSoFar ?? []).map((subset, i) => (
                  <div key={i} className="subset-item">
                    <span className="subset-bracket">[</span>
                    {subset.length === 0 ? (
                      <span className="subset-empty">∅</span>
                    ) : (
                      subset.map((x, j) => (
                        <span key={j} className="subset-num">
                          {x}
                          {j < subset.length - 1 ? ", " : ""}
                        </span>
                      ))
                    )}
                    <span className="subset-bracket">]</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="backtrack-section">
            <h2>Step log</h2>
            <div className="step-log">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className={`step-log-line ${i === (stepIndex ?? -1) ? "active" : ""}`}
                  onClick={() => {
                    setStepIndex(i);
                    setIsPlaying(false);
                  }}
                >
                  <span className="step-num">{i + 1}.</span>
                  <span className={`step-type ${s.type}`}>{s.type}</span>
                  <span className="step-desc">{stepLabel(s)}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="backtrack-section explainer">
        <h2>How subset backtracking works</h2>
        <ol>
          <li>
            <strong>Record</strong> the current path as a valid subset (every path is a subset).
          </li>
          <li>
            For each index <code>start</code> to end: <strong>choose</strong> the element (add to path), recurse to get all subsets that include it, then <strong>backtrack</strong> (remove it) and continue with the next index.
          </li>
          <li>
            Order of exploration: first include nothing, then include 1st, 2nd, …; after each choice we recurse and then backtrack so we try all combinations.
          </li>
        </ol>
      </div>
    </div>
  );
}
