import { useState, useRef } from "react";
import "./HeapVisualizer.css";

class MinHeap {
  heap: number[];

  constructor() {
    this.heap = [5, 10, 20, 30];
  }

  getParentIndex(i: number): number {
    return Math.floor((i - 1) / 2);
  }

  getLeftChildIndex(i: number): number {
    return 2 * i + 1;
  }

  getRightChildIndex(i: number): number {
    return 2 * i + 2;
  }

  insert(val: number): { steps: { heap: number[]; swapped: [number, number] | null }[] } {
    this.heap.push(val);
    const steps: { heap: number[]; swapped: [number, number] | null }[] = [
      { heap: [...this.heap], swapped: null },
    ];
    let i = this.heap.length - 1;

    while (i > 0) {
      const parentIndex = this.getParentIndex(i);
      if (this.heap[i] < this.heap[parentIndex]) {
        [this.heap[i], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[i]];
        steps.push({ heap: [...this.heap], swapped: [i, parentIndex] });
        i = parentIndex;
      } else {
        break;
      }
    }

    steps.push({ heap: [...this.heap], swapped: null });
    return { steps };
  }

  clone(): MinHeap {
    const copy = new MinHeap();
    copy.heap = [...this.heap];
    return copy;
  }
}

// ── Heap Sort helpers ──────────────────────────────────────────────────────

type SortStep = {
  arr: number[];
  swapped: [number, number] | null;
  heapSize: number;
  phase: "build" | "extract";
  description: string;
};

function heapifyDownSort(
  arr: number[],
  i: number,
  n: number,
  steps: SortStep[],
  phase: "build" | "extract"
) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    steps.push({
      arr: [...arr],
      swapped: [i, largest],
      heapSize: n,
      phase,
      description:
        phase === "build"
          ? `Build Max-Heap: swap index ${i} (${arr[largest]}) ↔ index ${largest} (${arr[i]})`
          : `Extract: swap root (${arr[largest]}) ↔ index ${i} (${arr[i]}), heapify down`,
    });
    heapifyDownSort(arr, largest, n, steps, phase);
  }
}

function generateSortSteps(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [];
  const n = arr.length;

  steps.push({ arr: [...arr], swapped: null, heapSize: n, phase: "build", description: "Initial array" });

  // Phase 1: Build max-heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapifyDownSort(arr, i, n, steps, "build");
  }
  steps.push({ arr: [...arr], swapped: null, heapSize: n, phase: "build", description: "Max-Heap built — root is the largest element" });

  // Phase 2: Extract elements
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    steps.push({
      arr: [...arr],
      swapped: [0, i],
      heapSize: i,
      phase: "extract",
      description: `Move max (${arr[i]}) to sorted position [${i}]`,
    });
    heapifyDownSort(arr, 0, i, steps, "extract");
  }

  steps.push({ arr: [...arr], swapped: null, heapSize: 0, phase: "extract", description: "Array fully sorted!" });
  return steps;
}

// ── End Heap Sort helpers ──────────────────────────────────────────────────

const initialHeap = new MinHeap();

export default function HeapVisualizer() {
  const [heapInstance, setHeapInstance] = useState<MinHeap>(() => initialHeap.clone());
  const [inputValue, setInputValue] = useState("");
  const [animationSteps, setAnimationSteps] = useState<{ heap: number[]; swapped: [number, number] | null }[]>([]);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastInserted, setLastInserted] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  // ── Heap Sort state ──
  const [sortInput, setSortInput] = useState("64 34 25 12 22 11 90");
  const [sortSteps, setSortSteps] = useState<SortStep[]>([]);
  const [sortStepIdx, setSortStepIdx] = useState<number | null>(null);
  const [isSortAnimating, setIsSortAnimating] = useState(false);
  const sortIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentSortStep = sortStepIdx !== null ? sortSteps[sortStepIdx] : null;

  const handleStartSort = () => {
    const nums = sortInput
      .split(/[\s,]+/)
      .map(Number)
      .filter((n) => !isNaN(n));
    if (nums.length < 2) return;

    const steps = generateSortSteps(nums);
    setSortSteps(steps);
    setSortStepIdx(0);
    setIsSortAnimating(true);

    let idx = 0;
    sortIntervalRef.current = setInterval(() => {
      idx++;
      if (idx < steps.length) {
        setSortStepIdx(idx);
      } else {
        clearInterval(sortIntervalRef.current!);
        setIsSortAnimating(false);
        setSortStepIdx(steps.length - 1);
      }
    }, 600);
  };

  const handleSortReset = () => {
    if (sortIntervalRef.current) clearInterval(sortIntervalRef.current);
    setSortSteps([]);
    setSortStepIdx(null);
    setIsSortAnimating(false);
  };

  const displayHeap = currentStep !== null ? animationSteps[currentStep].heap : heapInstance.heap;
  const swapped = currentStep !== null ? animationSteps[currentStep].swapped : null;

  const handleInsert = (val?: number) => {
    const value = val ?? parseInt(inputValue);
    if (isNaN(value)) return;

    setLastInserted(value);
    setInputValue("");
    setMessage("");

    const copy = heapInstance.clone();
    const { steps } = copy.insert(value);

    setAnimationSteps(steps);
    setIsAnimating(true);
    setCurrentStep(0);

    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        setCurrentStep(stepIndex);
      } else {
        clearInterval(interval);
        setIsAnimating(false);
        setCurrentStep(null);
        setHeapInstance(copy);
        setMessage(`Inserted ${value}. MinHeap property maintained: root is always the smallest.`);
      }
    }, 700);
  };

  const handleReset = () => {
    setHeapInstance(initialHeap.clone());
    setAnimationSteps([]);
    setCurrentStep(null);
    setIsAnimating(false);
    setInputValue("");
    setLastInserted(null);
    setMessage("");
  };

  // Build tree positions from the flat heap array
  const getTreeLevels = (arr: number[]): number[][] => {
    const levels: number[][] = [];
    let i = 0;
    let level = 0;
    while (i < arr.length) {
      const count = Math.pow(2, level);
      levels.push(arr.slice(i, i + count));
      i += count;
      level++;
    }
    return levels;
  };

  const levels = getTreeLevels(displayHeap);

  return (
    <div className="heap-container">
      <h1>Min Heap Visualizer</h1>
      <p className="heap-subtitle">
        In a <strong>Min Heap</strong>, every parent node is smaller than its children. The root is always the minimum element.
      </p>

      <div className="heap-tree-section">
        <h2>Heap Tree View</h2>
        <div className="heap-tree">
          {levels.map((level, levelIdx) => (
            <div key={levelIdx} className="heap-level">
              {level.map((val, nodeIdx) => {
                const flatIndex = Math.pow(2, levelIdx) - 1 + nodeIdx;
                const isSwapped = swapped !== null && (swapped[0] === flatIndex || swapped[1] === flatIndex);
                const isNew = lastInserted === val && flatIndex === displayHeap.length - 1 && currentStep === 0;

                return (
                  <div key={nodeIdx} className="heap-node-wrapper">
                    <div className={`heap-node ${isSwapped ? "swapped" : ""} ${isNew ? "new-node" : ""}`}>
                      {val}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="heap-array-section">
        <h2>Heap Array View</h2>
        <div className="heap-array">
          {displayHeap.map((val, idx) => {
            const isSwapped = swapped !== null && (swapped[0] === idx || swapped[1] === idx);
            return (
              <div key={idx} className={`array-cell ${isSwapped ? "swapped" : ""} ${idx === 0 ? "root-cell" : ""}`}>
                <span className="array-index">[{idx}]</span>
                <span className="array-value">{val}</span>
                {idx === 0 && <span className="root-label">min</span>}
              </div>
            );
          })}
        </div>
        <p className="array-formula">
          Parent of index <strong>i</strong> = ⌊(i−1)/2⌋ &nbsp;|&nbsp;
          Left child = 2i+1 &nbsp;|&nbsp;
          Right child = 2i+2
        </p>
      </div>

      <div className="heap-controls">
        <h2>Insert a Value</h2>
        <div className="insert-group">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isAnimating && handleInsert()}
            placeholder="Enter a number"
            className="heap-input"
            disabled={isAnimating}
          />
          <button onClick={() => handleInsert()} disabled={isAnimating || !inputValue} className="insert-btn">
            {isAnimating ? "Inserting..." : "Insert"}
          </button>
          <button onClick={handleReset} disabled={isAnimating} className="reset-btn">
            Reset
          </button>
        </div>

        <div className="quick-inserts">
          <p>Quick insert:</p>
          {[1, 3, 7, 15, 2].map((v) => (
            <button
              key={v}
              onClick={() => handleInsert(v)}
              disabled={isAnimating}
              className="quick-btn"
            >
              Insert {v}
            </button>
          ))}
        </div>

        {message && (
          <div className="heap-message">
            {message}
          </div>
        )}

        {isAnimating && swapped && (
          <div className="swap-message">
            Swapping index {swapped[0]} ({displayHeap[swapped[0]]}) with index {swapped[1]} ({displayHeap[swapped[1]]}) — HeapifyUp in progress...
          </div>
        )}
      </div>

      <div className="heap-explainer">
        <h2>How HeapifyUp Works</h2>
        <ol>
          <li>Insert the new value at the <strong>end</strong> of the array</li>
          <li>Compare it with its <strong>parent</strong> node</li>
          <li>If it's smaller than the parent, <strong>swap</strong> them</li>
          <li>Repeat until the heap property is restored or you reach the root</li>
        </ol>
      </div>

      {/* ── Heap Sort Section ── */}
      <div className="sort-section">
        <h2>Heap Sort Visualizer</h2>
        <p className="sort-subtitle">
          Heap Sort works in two phases: <strong>Build Max-Heap</strong> then <strong>repeatedly extract</strong> the max to sort in-place. Time: O(n log n).
        </p>

        <div className="sort-controls">
          <input
            className="heap-input sort-input"
            value={sortInput}
            onChange={(e) => setSortInput(e.target.value)}
            placeholder="e.g. 64 34 25 12 22"
            disabled={isSortAnimating}
          />
          <button
            className="insert-btn"
            onClick={handleStartSort}
            disabled={isSortAnimating}
          >
            {isSortAnimating ? "Sorting..." : "Sort"}
          </button>
          <button
            className="reset-btn"
            onClick={handleSortReset}
            disabled={isSortAnimating}
          >
            Reset
          </button>
        </div>

        {currentSortStep && (
          <>
            <div className={`sort-phase-badge ${currentSortStep.phase}`}>
              {currentSortStep.phase === "build" ? "Phase 1: Build Max-Heap" : "Phase 2: Extract & Sort"}
            </div>

            <div className="sort-array">
              {currentSortStep.arr.map((val, idx) => {
                const isSwapped =
                  currentSortStep.swapped !== null &&
                  (currentSortStep.swapped[0] === idx || currentSortStep.swapped[1] === idx);
                const isSorted = idx >= currentSortStep.heapSize;
                const isRoot = idx === 0 && currentSortStep.heapSize > 1;

                return (
                  <div
                    key={idx}
                    className={`sort-bar-wrapper`}
                  >
                    <div
                      className={`sort-bar ${isSwapped ? "sort-swapped" : ""} ${isSorted ? "sort-done" : ""} ${isRoot ? "sort-root" : ""}`}
                      style={{ height: `${Math.max(val / Math.max(...currentSortStep.arr), 0.05) * 140 + 20}px` }}
                    >
                      <span className="sort-bar-val">{val}</span>
                    </div>
                    <span className="sort-bar-idx">[{idx}]</span>
                  </div>
                );
              })}
            </div>

            <div className={`sort-step-desc ${currentSortStep.phase}`}>
              {currentSortStep.description}
            </div>

            <div className="sort-progress">
              Step {(sortStepIdx ?? 0) + 1} / {sortSteps.length}
            </div>
          </>
        )}

        <div className="heap-explainer sort-explainer">
          <h2>How Heap Sort Works</h2>
          <ol>
            <li><strong>Build Max-Heap:</strong> Rearrange the array so every parent ≥ its children</li>
            <li><strong>Extract max:</strong> Swap the root (max) with the last element</li>
            <li><strong>Shrink heap:</strong> Reduce heap size by 1 (last element is now sorted)</li>
            <li><strong>Heapify down:</strong> Restore max-heap property from the root</li>
            <li>Repeat steps 2–4 until heap size = 1</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
