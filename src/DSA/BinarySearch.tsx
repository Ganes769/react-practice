import { useState } from "react";

export default function BinarySearch() {
  const [arrayInput, setArrayInput] = useState("1, 2, 3, 4, 5, 6, 7");
  const [targetInput, setTargetInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [timeComplexity, setTimeComplexity] = useState("");

  function binarySearch(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const middle = Math.floor((left + right) / 2);

      if (arr[middle] === target) {
        return middle;
      }

      if (target < arr[middle]) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    }

    return -1;
  }

  const handleSearch = () => {
    if (!arrayInput.trim() || !targetInput.trim()) {
      alert("Please enter both array and target value");
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

    const target = parseFloat(targetInput.trim());
    if (isNaN(target)) {
      alert("Please enter a valid target number");
      return;
    }

    // Sort the array first (binary search requires sorted array)
    const sorted = [...numbers].sort((a, b) => a - b);

    // Perform binary search
    const startTime = performance.now();
    const index = binarySearch(sorted, target);
    const endTime = performance.now();
    const executionTime = (endTime - startTime).toFixed(4);

    setResult(index);
    setTimeComplexity(
      `Time Complexity: O(log n) | Execution Time: ${executionTime}ms`
    );
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Binary Search</h2>
      <div style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Array (comma or space separated):
          </label>
          <input
            type="text"
            value={arrayInput}
            onChange={(e) => setArrayInput(e.target.value)}
            placeholder="Enter numbers (e.g., 1, 2, 3, 4, 5)"
            style={{
              padding: "10px",
              fontSize: "16px",
              width: "300px",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Target value:
          </label>
          <input
            type="text"
            value={targetInput}
            onChange={(e) => setTargetInput(e.target.value)}
            placeholder="Enter target number"
            style={{
              padding: "10px",
              fontSize: "16px",
              width: "300px",
            }}
          />
        </div>
        <button
          onClick={handleSearch}
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
          Search
        </button>
      </div>

      {result !== null && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result:</h3>
          {result !== -1 ? (
            <p
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#4CAF50",
                padding: "10px",
                backgroundColor: "#e8f5e9",
                borderRadius: "4px",
                display: "inline-block",
              }}
            >
              Target found at index: {result}
            </p>
          ) : (
            <p
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#f44336",
                padding: "10px",
                backgroundColor: "#ffebee",
                borderRadius: "4px",
                display: "inline-block",
              }}
            >
              Target not found in the array
            </p>
          )}
          <p
            style={{
              marginTop: "10px",
              fontSize: "14px",
              color: "#666",
            }}
          >
            {timeComplexity}
          </p>
        </div>
      )}
    </div>
  );
}
