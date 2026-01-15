import { useState } from "react";

export default function BubbleSort() {
  const [arrayInput, setArrayInput] = useState("7, 5, 3, 2, 1");
  const [sortedArray, setSortedArray] = useState<number[] | null>(null);
  const [timeComplexity, setTimeComplexity] = useState("");
  const [spaceComplexity, setSpaceComplexity] = useState("");

  function bubbleSort(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
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

    // Perform bubble sort
    const startTime = performance.now();
    const sorted = bubbleSort([...numbers]); // Pass a copy to avoid mutating original
    const endTime = performance.now();
    const executionTime = (endTime - startTime).toFixed(4);

    setSortedArray(sorted);
    setTimeComplexity(
      `Time Complexity: O(n²) | Execution Time: ${executionTime}ms`
    );
    setSpaceComplexity("Space Complexity: O(1)");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Bubble Sort</h2>
      <div style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Array (comma or space separated):
          </label>
          <input
            type="text"
            value={arrayInput}
            onChange={(e) => setArrayInput(e.target.value)}
            placeholder="Enter numbers (e.g., 7, 5, 3, 2, 1)"
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
