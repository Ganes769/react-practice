import { useMemo, useRef, useState } from "react";

type Node = {
  value: number;
  next: Node | null;
};

class SinglyLinkedList {
  head: Node | null = null;
  tail: Node | null = null;
  size = 0;

  addAtHead(value: number) {
    const node: Node = { value, next: this.head };
    this.head = node;
    if (!this.tail) this.tail = node;
    this.size++;
  }

  addAtTail(value: number) {
    const node: Node = { value, next: null };
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
      this.size = 1;
      return;
    }

    this.tail.next = node;
    this.tail = node;
    this.size++;
  }

  insertAtIndex(index: number, value: number) {
    if (index <= 0) return this.addAtHead(value);
    if (index >= this.size) return this.addAtTail(value);
    if (!this.head) return this.addAtHead(value);

    let prev: Node = this.head;
    for (let i = 0; i < index - 1; i++) {
      prev = prev.next as Node;
    }
    const node: Node = { value, next: prev.next };
    prev.next = node;
    this.size++;
  }

  deleteAtIndex(index: number): boolean {
    if (!this.head || index < 0 || index >= this.size) {
      return false;
    }

    // Delete head
    if (index === 0) {
      this.head = this.head.next;
      if (!this.head) {
        this.tail = null;
      }
      this.size--;
      return true;
    }

    // Find the node before the one to delete
    let prev: Node = this.head;
    for (let i = 0; i < index - 1; i++) {
      prev = prev.next as Node;
    }

    // Delete the node
    if (prev.next) {
      prev.next = prev.next.next;
      // Update tail if we deleted the last node
      if (!prev.next) {
        this.tail = prev;
      }
      this.size--;
      return true;
    }

    return false;
  }

  hasCycle(): boolean {
    if (!this.head || !this.head.next) {
      return false;
    }

    // Floyd's cycle detection algorithm (tortoise and hare)
    let slow: Node | null = this.head;
    let fast: Node | null = this.head;

    while (fast && fast.next) {
      slow = slow!.next;
      fast = fast.next.next;
      if (slow === fast) {
        return true;
      }
    }

    return false;
  }

  createCycleAt(index: number): boolean {
    if (!this.head || !this.tail) {
      return false;
    }

    if (index < 0 || index >= this.size) {
      return false;
    }

    // Find the node at the given index
    let target: Node = this.head;
    for (let i = 0; i < index; i++) {
      if (!target.next) return false;
      target = target.next;
    }

    // Point tail to the target node to create a cycle
    this.tail.next = target;
    return true;
  }

  toArray(): number[] {
    const out: number[] = [];
    let cur = this.head;
    const visited = new Set<Node>();
    let count = 0;
    const maxNodes = 100; // Prevent infinite loops in display

    while (cur && count < maxNodes) {
      if (visited.has(cur)) {
        out.push(`[CYCLE: ${cur.value}]`);
        break;
      }
      visited.add(cur);
      out.push(cur.value);
      cur = cur.next;
      count++;
    }
    return out;
  }
}

export default function LinkedList() {
  const listRef = useRef<SinglyLinkedList>(new SinglyLinkedList());

  const [headValue, setHeadValue] = useState("");
  const [tailValue, setTailValue] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [indexToInsert, setIndexToInsert] = useState("");
  const [indexToDelete, setIndexToDelete] = useState("");
  const [cycleIndex, setCycleIndex] = useState("");
  const [hasCycleResult, setHasCycleResult] = useState<boolean | null>(null);

  const [listView, setListView] = useState<number[]>([]);
  const [message, setMessage] = useState("");

  const pretty = useMemo(() => {
    if (listView.length === 0) return "empty";
    return `${listView.join(" → ")} → null`;
  }, [listView]);

  const refresh = (opMessage: string) => {
    setListView(listRef.current.toArray());
    setMessage(opMessage);
  };

  const parseNumber = (raw: string) => {
    const n = Number(raw.trim());
    return Number.isFinite(n) ? n : null;
  };

  const parseIndex = (raw: string) => {
    const n = Number(raw.trim());
    if (!Number.isFinite(n)) return null;
    return Math.trunc(n);
  };

  const handleAddHead = () => {
    const n = parseNumber(headValue);
    if (n === null) return alert("Please enter a valid number for head");
    listRef.current.addAtHead(n);
    setHeadValue("");
    refresh("Added at head (O(1))");
  };

  const handleAddTail = () => {
    const n = parseNumber(tailValue);
    if (n === null) return alert("Please enter a valid number for tail");
    listRef.current.addAtTail(n);
    setTailValue("");
    refresh("Added at tail (O(1))");
  };

  const handleInsertAtIndex = () => {
    const idx = parseIndex(indexToInsert);
    if (idx === null) return alert("Please enter a valid index (integer)");
    const n = parseNumber(indexValue);
    if (n === null) return alert("Please enter a valid number to insert");

    listRef.current.insertAtIndex(idx, n);
    setIndexToInsert("");
    setIndexValue("");
    refresh("Inserted at index (O(n))");
  };

  const handleDeleteAtIndex = () => {
    const idx = parseIndex(indexToDelete);
    if (idx === null) return alert("Please enter a valid index (integer)");
    if (idx < 0) return alert("Index must be non-negative");
    
    const success = listRef.current.deleteAtIndex(idx);
    if (!success) {
      return alert(`Cannot delete at index ${idx}. Index out of bounds or list is empty.`);
    }
    setIndexToDelete("");
    refresh(`Deleted at index ${idx} (O(n))`);
  };

  const handleCreateCycle = () => {
    const idx = parseIndex(cycleIndex);
    if (idx === null) return alert("Please enter a valid index (integer)");
    if (idx < 0) return alert("Index must be non-negative");
    
    const success = listRef.current.createCycleAt(idx);
    if (!success) {
      return alert(`Cannot create cycle at index ${idx}. Index out of bounds or list is empty.`);
    }
    setCycleIndex("");
    refresh(`Cycle created: tail points to node at index ${idx}`);
  };

  const handleCheckCycle = () => {
    const hasCycle = listRef.current.hasCycle();
    setHasCycleResult(hasCycle);
    setMessage(hasCycle ? "Cycle detected! (O(n) time, O(1) space)" : "No cycle detected (O(n) time, O(1) space)");
    setListView(listRef.current.toArray());
  };

  const handleReset = () => {
    listRef.current = new SinglyLinkedList();
    setHeadValue("");
    setTailValue("");
    setIndexValue("");
    setIndexToInsert("");
    setIndexToDelete("");
    setCycleIndex("");
    setHasCycleResult(null);
    setListView([]);
    setMessage("Reset list");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Linked List (Singly)</h2>

      <div style={{ marginBottom: "18px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Value for head:
          </label>
          <input
            type="text"
            value={headValue}
            onChange={(e) => setHeadValue(e.target.value)}
            placeholder="e.g., 10"
            style={{ padding: "10px", fontSize: "16px", width: "300px" }}
          />
          <button
            onClick={handleAddHead}
            style={{
              marginLeft: "10px",
              padding: "10px 16px",
              fontSize: "16px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add at head
          </button>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Value for tail:
          </label>
          <input
            type="text"
            value={tailValue}
            onChange={(e) => setTailValue(e.target.value)}
            placeholder="e.g., 20"
            style={{ padding: "10px", fontSize: "16px", width: "300px" }}
          />
          <button
            onClick={handleAddTail}
            style={{
              marginLeft: "10px",
              padding: "10px 16px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add at tail
          </button>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Insert at index:
          </label>
          <input
            type="text"
            value={indexToInsert}
            onChange={(e) => setIndexToInsert(e.target.value)}
            placeholder="index (e.g., 1)"
            style={{ padding: "10px", fontSize: "16px", width: "140px" }}
          />
          <input
            type="text"
            value={indexValue}
            onChange={(e) => setIndexValue(e.target.value)}
            placeholder="value (e.g., 99)"
            style={{
              marginLeft: "10px",
              padding: "10px",
              fontSize: "16px",
              width: "140px",
            }}
          />
          <button
            onClick={handleInsertAtIndex}
            style={{
              marginLeft: "10px",
              padding: "10px 16px",
              fontSize: "16px",
              backgroundColor: "#ff9800",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Insert
          </button>

          <button
            onClick={handleReset}
            style={{
              marginLeft: "10px",
              padding: "10px 16px",
              fontSize: "16px",
              backgroundColor: "#9e9e9e",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Delete at index:
          </label>
          <input
            type="text"
            value={indexToDelete}
            onChange={(e) => setIndexToDelete(e.target.value)}
            placeholder="index (e.g., 1)"
            style={{ padding: "10px", fontSize: "16px", width: "300px" }}
          />
          <button
            onClick={handleDeleteAtIndex}
            style={{
              marginLeft: "10px",
              padding: "10px 16px",
              fontSize: "16px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Delete at index
          </button>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Create cycle (point tail to index):
          </label>
          <input
            type="text"
            value={cycleIndex}
            onChange={(e) => setCycleIndex(e.target.value)}
            placeholder="index (e.g., 0)"
            style={{ padding: "10px", fontSize: "16px", width: "300px" }}
          />
          <button
            onClick={handleCreateCycle}
            style={{
              marginLeft: "10px",
              padding: "10px 16px",
              fontSize: "16px",
              backgroundColor: "#9c27b0",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Create Cycle
          </button>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <button
            onClick={handleCheckCycle}
            style={{
              padding: "10px 16px",
              fontSize: "16px",
              backgroundColor: "#00bcd4",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Check for Cycle
          </button>
          {hasCycleResult !== null && (
            <span
              style={{
                marginLeft: "15px",
                padding: "8px 12px",
                fontSize: "16px",
                fontWeight: "bold",
                backgroundColor: hasCycleResult ? "#ffebee" : "#e8f5e9",
                color: hasCycleResult ? "#c62828" : "#2e7d32",
                borderRadius: "4px",
              }}
            >
              {hasCycleResult ? "✓ Cycle Detected" : "✗ No Cycle"}
            </span>
          )}
        </div>
      </div>

      <div style={{ marginTop: "16px" }}>
        <h3>Current list</h3>
        <p
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            padding: "10px",
            backgroundColor: "#f5f5f5",
            borderRadius: "6px",
            display: "inline-block",
          }}
        >
          {pretty}
        </p>
        {message && (
          <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
