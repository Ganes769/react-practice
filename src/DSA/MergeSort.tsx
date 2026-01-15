import { useState } from "react";

export default function MergeSort() {
  const [arrayInput, setArrayInput] = useState("9, 8, 6, 5, 4");
  const [sortedArray, setSortedArray] = useState<number[] | null>(null);
  const [timeComplexity, setTimeComplexity] = useState("");
  const [spaceComplexity, setSpaceComplexity] = useState("");

  function merge(left: number[], right: number[]) {
    const result = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
  }

  function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) {
      return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
  }

  const handleSort = () => {
    if (!arrayInput.trim()) {
      alert("Please enter an array");
      return;
    }

    // Parse array input
    const numbers = arrayInput
      .split(/[,\s]+/)
      .map((num) => parseFloat(num.trim()))
      .filter((num) => !isNaN(num));

    if (numbers.length === 0) {
      alert("Please enter valid numbers for the array");
      return;
    }

    // Perform merge sort
    const startTime = performance.now();
    const sorted = mergeSort([...numbers]); // Pass a copy to avoid mutating original
    const endTime = performance.now();
    const executionTime = (endTime - startTime).toFixed(4);

    setSortedArray(sorted);
    setTimeComplexity(
      `Time Complexity: O(n log n) | Execution Time: ${executionTime}ms`
    );
    setSpaceComplexity("Space Complexity: O(n)");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Merge Sort</h2>
      <div style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Array (comma or space separated):
          </label>
          <input
            type="text"
            value={arrayInput}
            onChange={(e) => setArrayInput(e.target.value)}
            placeholder="Enter numbers (e.g., 9, 8, 6, 5, 4)"
            style={{
              padding: "10px",
              fontSize: "16px",
              width: "300px",
            }}
          />
        </div>
        <button
          onClick={handleSort}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Sort
        </button>
      </div>

      {sortedArray !== null && (
        <div style={{ marginTop: "20px" }}>
          <h3>Output:</h3>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#4CAF50",
              padding: "10px",
              backgroundColor: "#e8f5e9",
              borderRadius: "4px",
              display: "inline-block",
              marginBottom: "10px",
            }}
          >
            Sorted Array: [{sortedArray.join(", ")}]
          </div>
          <div style={{ marginTop: "10px" }}>
            <p
              style={{
                fontSize: "14px",
                color: "#666",
                marginBottom: "5px",
              }}
            >
              {timeComplexity}
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#666",
              }}
            >
              {spaceComplexity}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
