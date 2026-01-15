import { useState } from "react";

interface ComplexityData {
  name: string;
  notation: string;
  description: string;
  examples: string[];
  bestCase: string;
  averageCase: string;
  worstCase: string;
  calculateValue: (n: number) => number;
}

const complexities: ComplexityData[] = [
  {
    name: "Constant",
    notation: "O(1)",
    description: "Time complexity is constant regardless of input size",
    examples: ["Array access by index", "Hash table lookup", "Push/pop in stack"],
    bestCase: "O(1)",
    averageCase: "O(1)",
    worstCase: "O(1)",
    calculateValue: () => 1,
  },
  {
    name: "Logarithmic",
    notation: "O(log n)",
    description: "Time grows logarithmically with input size",
    examples: ["Binary search", "Finding element in balanced BST", "Divide and conquer algorithms"],
    bestCase: "O(1)",
    averageCase: "O(log n)",
    worstCase: "O(log n)",
    calculateValue: (n) => Math.log2(n) || 1,
  },
  {
    name: "Linear",
    notation: "O(n)",
    description: "Time grows linearly with input size",
    examples: ["Linear search", "Traversing an array", "Finding max/min in array"],
    bestCase: "O(1)",
    averageCase: "O(n)",
    worstCase: "O(n)",
    calculateValue: (n) => n,
  },
  {
    name: "Linearithmic",
    notation: "O(n log n)",
    description: "Time grows in proportion to n log n",
    examples: ["Merge sort", "Heap sort", "Quick sort (average case)", "Most efficient comparison sorts"],
    bestCase: "O(n log n)",
    averageCase: "O(n log n)",
    worstCase: "O(n log n)",
    calculateValue: (n) => n * Math.log2(n) || n,
  },
  {
    name: "Quadratic",
    notation: "O(n²)",
    description: "Time grows quadratically with input size",
    examples: ["Bubble sort", "Selection sort", "Insertion sort", "Nested loops"],
    bestCase: "O(n)",
    averageCase: "O(n²)",
    worstCase: "O(n²)",
    calculateValue: (n) => n * n,
  },
  {
    name: "Cubic",
    notation: "O(n³)",
    description: "Time grows cubically with input size",
    examples: ["Three nested loops", "Matrix multiplication (naive)", "3D array traversal"],
    bestCase: "O(n³)",
    averageCase: "O(n³)",
    worstCase: "O(n³)",
    calculateValue: (n) => n * n * n,
  },
  {
    name: "Exponential",
    notation: "O(2^n)",
    description: "Time doubles with each additional input element",
    examples: ["Recursive Fibonacci (naive)", "Tower of Hanoi", "Subset generation", "Brute force algorithms"],
    bestCase: "O(2^n)",
    averageCase: "O(2^n)",
    worstCase: "O(2^n)",
    calculateValue: (n) => Math.pow(2, n),
  },
  {
    name: "Factorial",
    notation: "O(n!)",
    description: "Time grows factorially with input size",
    examples: ["Generating all permutations", "Traveling Salesman Problem (brute force)", "Solving puzzles"],
    bestCase: "O(n!)",
    averageCase: "O(n!)",
    worstCase: "O(n!)",
    calculateValue: (n) => {
      let result = 1;
      for (let i = 2; i <= n; i++) {
        result *= i;
      }
      return result;
    },
  },
];

// Visual Diagram Component
function ComplexityDiagram({ complexity, maxN }: { complexity: ComplexityData; maxN: number }) {
  const dataPoints = [1, 2, 4, 8, 16].filter((n) => n <= maxN);
  const maxValue = Math.max(...dataPoints.map((n) => complexity.calculateValue(n)));
  
  // Cap exponential and factorial for visualization
  const getDisplayValue = (n: number) => {
    const value = complexity.calculateValue(n);
    if (value > 1000) return 1000; // Cap for visualization
    return value;
  };

  return (
    <div style={{ marginTop: "15px" }}>
      <h4 style={{ marginBottom: "10px", fontSize: "14px", color: "#666" }}>Growth Visualization:</h4>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", height: "150px", padding: "10px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
        {dataPoints.map((n) => {
          const value = getDisplayValue(n);
          const height = (value / maxValue) * 100;
          const isCapped = complexity.calculateValue(n) > 1000;
          
          return (
            <div key={n} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  width: "100%",
                  height: `${height}%`,
                  backgroundColor: isCapped ? "#ff9800" : "#4CAF50",
                  borderRadius: "4px 4px 0 0",
                  minHeight: "10px",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  padding: "5px",
                  color: "white",
                  fontSize: "10px",
                  fontWeight: "bold",
                }}
                title={`n=${n}, value=${complexity.calculateValue(n).toFixed(2)}`}
              >
                {isCapped ? ">" : Math.round(value)}
              </div>
              <div style={{ marginTop: "5px", fontSize: "11px", color: "#666" }}>n={n}</div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
        <strong>Values:</strong> {dataPoints.map((n) => `n=${n}: ${complexity.calculateValue(n).toFixed(2)}`).join(" | ")}
      </div>
    </div>
  );
}

// Line Graph Component for All Complexities
function ComplexityLineGraph({ maxN }: { maxN: number }) {
  const colors = [
    "#4CAF50",   // O(1) - Green
    "#2196F3",   // O(log n) - Blue
    "#FF9800",   // O(n) - Orange
    "#9C27B0",   // O(n log n) - Purple
    "#F44336",   // O(n²) - Red
    "#00BCD4",   // O(n³) - Cyan
    "#E91E63",   // O(2^n) - Pink
    "#795548",   // O(n!) - Brown
  ];

  // Generate data points
  const nValues: number[] = [];
  for (let i = 1; i <= maxN; i *= 2) {
    nValues.push(i);
  }
  if (nValues[nValues.length - 1] !== maxN) {
    nValues.push(maxN);
  }

  // Calculate all values for all complexities
  const allValues = complexities.map((complexity) =>
    nValues.map((n) => complexity.calculateValue(n))
  );

  // Find max value for scaling (cap very large values for visualization)
  const maxValue = Math.max(
    ...allValues.flat().map((v) => (v > 10000 ? 10000 : v))
  );

  const graphWidth = 800;
  const graphHeight = 400;
  const padding = { top: 40, right: 40, bottom: 60, left: 80 };

  // Convert value to y coordinate
  const valueToY = (value: number) => {
    const cappedValue = value > 10000 ? 10000 : value;
    const normalized = cappedValue / maxValue;
    return graphHeight - padding.bottom - normalized * (graphHeight - padding.top - padding.bottom);
  };

  // Convert n to x coordinate
  const nToX = (n: number, index: number) => {
    const totalWidth = graphWidth - padding.left - padding.right;
    return padding.left + (index / (nValues.length - 1)) * totalWidth;
  };

  // Generate path for a line
  const generatePath = (values: number[]) => {
    return values
      .map((value, index) => {
        const x = nToX(nValues[index], index);
        const y = valueToY(value);
        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", overflowX: "auto" }}>
        <svg
          width={graphWidth}
          height={graphHeight + 100}
          style={{ display: "block", margin: "0 auto" }}
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = padding.top + ratio * (graphHeight - padding.top - padding.bottom);
            return (
              <g key={ratio}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={graphWidth - padding.right}
                  y2={y}
                  stroke="#e0e0e0"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  fontSize="11"
                  fill="#666"
                  textAnchor="end"
                >
                  {Math.round(maxValue * (1 - ratio)).toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* X-axis grid lines */}
          {nValues.map((n, index) => {
            const x = nToX(n, index);
            return (
              <g key={n}>
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={graphHeight - padding.bottom}
                  stroke="#e0e0e0"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
                <text
                  x={x}
                  y={graphHeight - padding.bottom + 20}
                  fontSize="11"
                  fill="#666"
                  textAnchor="middle"
                >
                  {n}
                </text>
              </g>
            );
          })}

          {/* Draw lines for each complexity */}
          {complexities.map((complexity, index) => {
            const values = nValues.map((n) => complexity.calculateValue(n));
            const path = generatePath(values);
            const isCapped = values.some((v) => v > 10000);

            return (
              <g key={index}>
                <path
                  d={path}
                  fill="none"
                  stroke={colors[index]}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Data points */}
                {values.map((value, pointIndex) => {
                  const x = nToX(nValues[pointIndex], pointIndex);
                  const y = valueToY(value);
                  return (
                    <circle
                      key={pointIndex}
                      cx={x}
                      cy={y}
                      r="4"
                      fill={colors[index]}
                      stroke="white"
                      strokeWidth="2"
                    />
                  );
                })}
              </g>
            );
          })}

          {/* Axes */}
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={graphHeight - padding.bottom}
            stroke="#333"
            strokeWidth="2"
          />
          <line
            x1={padding.left}
            y1={graphHeight - padding.bottom}
            x2={graphWidth - padding.right}
            y2={graphHeight - padding.bottom}
            stroke="#333"
            strokeWidth="2"
          />

          {/* Axis labels */}
          <text
            x={graphWidth / 2}
            y={graphHeight + 40}
            fontSize="14"
            fill="#333"
            textAnchor="middle"
            fontWeight="bold"
          >
            Input Size (n)
          </text>
          <text
            x={20}
            y={graphHeight / 2}
            fontSize="14"
            fill="#333"
            textAnchor="middle"
            transform={`rotate(-90, 20, ${graphHeight / 2})`}
            fontWeight="bold"
          >
            Time Complexity Value
          </text>
        </svg>

        {/* Legend */}
        <div style={{ marginTop: "30px", display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {complexities.map((complexity, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 12px",
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#e0e0e0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#f5f5f5";
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "4px",
                  backgroundColor: colors[index],
                  borderRadius: "2px",
                }}
              />
              <span style={{ fontSize: "13px", color: "#333", fontWeight: "500" }}>
                {complexity.notation}
              </span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: "15px", fontSize: "12px", color: "#666", fontStyle: "italic", textAlign: "center" }}>
          * Values are capped at 10,000 for visualization. Exponential and Factorial grow much faster in reality.
        </p>
      </div>
    </div>
  );
}

// Interactive Line Graph Component
function InteractiveLineGraph() {
  const [maxN, setMaxN] = useState(32);
  const nOptions = [8, 16, 32, 64];

  return (
    <div style={{ marginTop: "40px", padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#333", margin: 0 }}>Time Complexity Growth Graph</h2>
        <div>
          <label style={{ marginRight: "10px", fontSize: "14px", fontWeight: "bold" }}>Max n value:</label>
          <select
            value={maxN}
            onChange={(e) => setMaxN(Number(e.target.value))}
            style={{
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "14px",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            {nOptions.map((n) => (
              <option key={n} value={n}>
                n = {n}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ComplexityLineGraph maxN={maxN} />
    </div>
  );
}

export default function TimeComplexity() {
  const [selectedComplexity, setSelectedComplexity] = useState<ComplexityData | null>(null);
  const [maxN, setMaxN] = useState(16);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", color: "#2196F3", marginBottom: "30px" }}>
        Time Complexity Reference Guide
      </h1>

      {/* Overview Table */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Quick Reference</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            <thead>
              <tr style={{ backgroundColor: "#2196F3", color: "white" }}>
                <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Notation</th>
                <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Name</th>
                <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Best Case</th>
                <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Average Case</th>
                <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Worst Case</th>
                <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {complexities.map((complexity, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#e3f2fd";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#f9f9f9" : "white";
                  }}
                >
                  <td style={{ padding: "12px", border: "1px solid #ddd", fontWeight: "bold", color: "#2196F3" }}>
                    {complexity.notation}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{complexity.name}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{complexity.bestCase}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{complexity.averageCase}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>{complexity.worstCase}</td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    <button
                      onClick={() => setSelectedComplexity(complexity)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed View */}
      {selectedComplexity && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ color: "#2196F3", margin: 0 }}>
              {selectedComplexity.notation} - {selectedComplexity.name}
            </h2>
            <button
              onClick={() => setSelectedComplexity(null)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>

          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "4px", marginBottom: "20px" }}>
            <h3 style={{ color: "#333", marginBottom: "10px" }}>Description</h3>
            <p style={{ color: "#666", lineHeight: "1.6" }}>{selectedComplexity.description}</p>
          </div>

          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "4px", marginBottom: "20px" }}>
            <h3 style={{ color: "#333", marginBottom: "10px" }}>Common Examples</h3>
            <ul style={{ color: "#666", lineHeight: "1.8", paddingLeft: "20px" }}>
              {selectedComplexity.examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </div>

          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "4px", marginBottom: "20px" }}>
            <h3 style={{ color: "#333", marginBottom: "10px" }}>Complexity Analysis</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
              <div style={{ padding: "15px", backgroundColor: "#e8f5e9", borderRadius: "4px" }}>
                <strong style={{ color: "#2e7d32" }}>Best Case:</strong>
                <div style={{ color: "#666", marginTop: "5px" }}>{selectedComplexity.bestCase}</div>
              </div>
              <div style={{ padding: "15px", backgroundColor: "#fff3e0", borderRadius: "4px" }}>
                <strong style={{ color: "#e65100" }}>Average Case:</strong>
                <div style={{ color: "#666", marginTop: "5px" }}>{selectedComplexity.averageCase}</div>
              </div>
              <div style={{ padding: "15px", backgroundColor: "#ffebee", borderRadius: "4px" }}>
                <strong style={{ color: "#c62828" }}>Worst Case:</strong>
                <div style={{ color: "#666", marginTop: "5px" }}>{selectedComplexity.worstCase}</div>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "4px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <h3 style={{ color: "#333", margin: 0 }}>Visual Growth Chart</h3>
              <div>
                <label style={{ marginRight: "10px", fontSize: "14px" }}>Max n:</label>
                <select
                  value={maxN}
                  onChange={(e) => setMaxN(Number(e.target.value))}
                  style={{ padding: "5px", borderRadius: "4px", border: "1px solid #ddd" }}
                >
                  <option value={8}>8</option>
                  <option value={16}>16</option>
                  <option value={32}>32</option>
                </select>
              </div>
            </div>
            <ComplexityDiagram complexity={selectedComplexity} maxN={maxN} />
          </div>
        </div>
      )}

      {/* Interactive Line Graph */}
      <InteractiveLineGraph />
    </div>
  );
}
