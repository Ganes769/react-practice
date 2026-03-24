import { useState, useRef, useEffect } from "react";
import "./QuickSortVisualizer.css";

export type QuickSortStep = {
  arr: number[];
  left: number;
  right: number;
  pivotIndex: number | null;
  compareI: number | null;
  storeIdx: number | null;
  swapPair: [number, number] | null;
  description: string;
  inFinalPlace: boolean[];
};

function generateQuickSortSteps(input: number[]): QuickSortStep[] {
  const a = [...input];
  const n = a.length;
  const steps: QuickSortStep[] = [];
  const inFinalPlace = new Array(n).fill(false);

  if (n === 0) return steps;

  steps.push({
    arr: [...a],
    left: 0,
    right: n - 1,
    pivotIndex: null,
    compareI: null,
    storeIdx: null,
    swapPair: null,
    description: "Initial array — Quick Sort (Lomuto partition, pivot = last element)",
    inFinalPlace: [...inFinalPlace],
  });

  function partition(left: number, right: number): number {
    const pivotIdx = right;
    const pivot = a[pivotIdx];
    let store = left - 1;

    steps.push({
      arr: [...a],
      left,
      right,
      pivotIndex: pivotIdx,
      compareI: null,
      storeIdx: store,
      swapPair: null,
      description: `Partition range [${left}…${right}] — pivot = ${pivot} at index ${pivotIdx}`,
      inFinalPlace: [...inFinalPlace],
    });

    for (let i = left; i < right; i++) {
      steps.push({
        arr: [...a],
        left,
        right,
        pivotIndex: pivotIdx,
        compareI: i,
        storeIdx: store,
        swapPair: null,
        description: `Compare arr[${i}] = ${a[i]} with pivot ${pivot}`,
        inFinalPlace: [...inFinalPlace],
      });

      if (a[i] < pivot) {
        store++;
        if (store !== i) {
          [a[store], a[i]] = [a[i], a[store]];
          steps.push({
            arr: [...a],
            left,
            right,
            pivotIndex: pivotIdx,
            compareI: i,
            storeIdx: store,
            swapPair: [store, i],
            description: `Swap arr[${store}] ↔ arr[${i}] (value < pivot)`,
            inFinalPlace: [...inFinalPlace],
          });
        }
      }
    }

    const newPivot = store + 1;
    [a[newPivot], a[pivotIdx]] = [a[pivotIdx], a[newPivot]];
    steps.push({
      arr: [...a],
      left,
      right,
      pivotIndex: newPivot,
      compareI: null,
      storeIdx: store,
      swapPair: [newPivot, pivotIdx],
      description: `Swap pivot into place: arr[${newPivot}] ↔ arr[${pivotIdx}]`,
      inFinalPlace: [...inFinalPlace],
    });

    inFinalPlace[newPivot] = true;
    steps.push({
      arr: [...a],
      left,
      right,
      pivotIndex: newPivot,
      compareI: null,
      storeIdx: null,
      swapPair: null,
      description: `Pivot ${a[newPivot]} is now in its final sorted position`,
      inFinalPlace: [...inFinalPlace],
    });

    return newPivot;
  }

  function quickSort(left: number, right: number) {
    if (left < right) {
      const p = partition(left, right);
      quickSort(left, p - 1);
      quickSort(p + 1, right);
    } else if (left === right) {
      inFinalPlace[left] = true;
      steps.push({
        arr: [...a],
        left,
        right,
        pivotIndex: left,
        compareI: null,
        storeIdx: null,
        swapPair: null,
        description: `Single element at [${left}] — already sorted`,
        inFinalPlace: [...inFinalPlace],
      });
    }
  }

  quickSort(0, n - 1);

  steps.push({
    arr: [...a],
    left: 0,
    right: n - 1,
    pivotIndex: null,
    compareI: null,
    storeIdx: null,
    swapPair: null,
    description: "Done — array is fully sorted",
    inFinalPlace: [...inFinalPlace],
  });

  return steps;
}

const defaultInput = "8 3 1 4 7 0 10 2";

export default function QuickSortVisualizer() {
  const [input, setInput] = useState(defaultInput);
  const [steps, setSteps] = useState<QuickSortStep[]>([]);
  const [stepIndex, setStepIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(650);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const arr = input
    .split(/[\s,]+/)
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !isNaN(n));

  const current = stepIndex !== null && steps.length ? steps[stepIndex] : null;
  const maxVal = current ? Math.max(...current.arr, 1) : 1;

  const buildSteps = () => {
    if (arr.length < 1 || arr.length > 18) return;
    const s = generateQuickSortSteps(arr);
    setSteps(s);
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

  const togglePlay = () => {
    if (steps.length === 0) buildSteps();
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

  return (
    <div className="qs-container">
      <h1>Quick Sort Visualizer</h1>
      <p className="qs-subtitle">
        <strong>Lomuto partition</strong>: last element is the pivot. Smaller values swap left; then pivot moves to its final index. Average time O(n log n).
      </p>

      <div className="qs-section">
        <h2>Input</h2>
        <div className="qs-controls">
          <input
            className="qs-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 8 3 1 4 7 0 10 2"
          />
          <button
            type="button"
            className="qs-btn primary"
            onClick={buildSteps}
            disabled={arr.length < 1 || arr.length > 18}
          >
            Build steps
          </button>
          <button type="button" className="qs-btn" onClick={reset}>
            Reset
          </button>
        </div>
        {arr.length > 18 && (
          <p className="qs-hint">Use at most 18 numbers for a clear view.</p>
        )}
      </div>

      {steps.length > 0 && current && (
        <>
          <div className="qs-section">
            <h2>Animation</h2>
            <div className="qs-playback">
              <button type="button" className="qs-btn primary" onClick={togglePlay}>
                {isPlaying ? "Pause" : stepIndex !== null && stepIndex >= steps.length - 1 && steps.length > 1 ? "Replay" : "Play"}
              </button>
              <label className="qs-speed">
                Delay:
                <input
                  type="range"
                  min={150}
                  max={1200}
                  step={50}
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                />
                {speed}ms
              </label>
            </div>
            <div className="qs-slider-row">
              <input
                type="range"
                min={0}
                max={steps.length - 1}
                value={stepIndex ?? 0}
                onChange={(e) => {
                  setStepIndex(Number(e.target.value));
                  setIsPlaying(false);
                }}
                className="qs-slider"
              />
              <span className="qs-step-num">
                {(stepIndex ?? 0) + 1} / {steps.length}
              </span>
            </div>
          </div>

          <div className="qs-section">
            <h2>Array</h2>
            <div className="qs-bars">
              {current.arr.map((val, idx) => {
                const inRange = idx >= current.left && idx <= current.right;
                const isPivot = current.pivotIndex === idx;
                const isCompare = current.compareI === idx;
                const isSwap =
                  current.swapPair !== null &&
                  (current.swapPair[0] === idx || current.swapPair[1] === idx);
                const isSorted = current.inFinalPlace[idx];

                let cls = "qs-bar";
                if (isSorted) cls += " sorted";
                else {
                  if (!inRange) cls += " out-range";
                  if (isSwap) cls += " swap";
                  else if (isPivot) cls += " pivot";
                  else if (isCompare) cls += " compare";
                }

                return (
                  <div key={idx} className="qs-bar-wrap">
                    <div
                      className={cls}
                      style={{
                        height: `${Math.max(val / maxVal, 0.08) * 150 + 24}px`,
                      }}
                    >
                      <span className="qs-bar-val">{val}</span>
                    </div>
                    <span className="qs-bar-idx">[{idx}]</span>
                  </div>
                );
              })}
            </div>
            <p className="qs-desc">{current.description}</p>
            <div className="qs-legend">
              <span><i className="lg lg-default" /> Active range</span>
              <span><i className="lg lg-pivot" /> Pivot</span>
              <span><i className="lg lg-compare" /> Comparing</span>
              <span><i className="lg lg-swap" /> Swap</span>
              <span><i className="lg lg-sorted" /> Final position</span>
              <span><i className="lg lg-dim" /> Outside partition</span>
            </div>
          </div>
        </>
      )}

      <div className="qs-section qs-explainer">
        <h2>How it works</h2>
        <ol>
          <li>Pick the <strong>last</strong> element in the range as the <strong>pivot</strong>.</li>
          <li>Scan left to right (excluding pivot): if <code>arr[i] &lt; pivot</code>, grow the “smaller” region and swap into place.</li>
          <li>Put the pivot <strong>after</strong> the smaller region — it is now in its <strong>final</strong> index.</li>
          <li>Recurse on the left and right subarrays until ranges are size 0 or 1.</li>
        </ol>
      </div>
    </div>
  );
}
