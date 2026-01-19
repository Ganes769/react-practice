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
      // index is in-range, so prev.next must exist before we finish loop
      prev = prev.next as Node;
    }
    const node: Node = { value, next: prev.next };
    prev.next = node;
    this.size++;
  }

  toArray(): number[] {
    const out: number[] = [];
    let cur = this.head;
    while (cur) {
      out.push(cur.value);
      cur = cur.next;
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

  const handleReset = () => {
    listRef.current = new SinglyLinkedList();
    setHeadValue("");
    setTailValue("");
    setIndexValue("");
    setIndexToInsert("");
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
