import React, { useMemo, useState, useTransition } from "react";

function makeItems(count) {
  return Array.from(
    { length: count },
    (_, i) => `Item ${i} - ${Math.random()}`
  );
}

// Artificial CPU work to make filtering/rendering noticeably slow
function burnCpu(ms = 8) {
  const end = performance.now() + ms;
  while (performance.now() < end) {}
}

export default function UseTran() {
  const items = useMemo(() => makeItems(500000), []);
  const [useTrans, setUseTrans] = useState(true);

  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");

  const [isPending, startTransition] = useTransition();

  const results = useMemo(() => {
    // make it slow enough to see the lag
    burnCpu(10);

    const q = query.toLowerCase();
    return items.filter((x) => x.toLowerCase().includes(q));
  }, [items, query]);

  function onChange(e) {
    const next = e.target.value;

    // Urgent update: keep typing responsive
    setInput(next);

    // Expensive update: either urgent (laggy) or transition (smooth)
    if (useTrans) {
      startTransition(() => setQuery(next));
    } else {
      setQuery(next);
    }
  }

  return (
    <div style={{ fontFamily: "system-ui", padding: 16, maxWidth: 720 }}>
      <h2>useTransition test</h2>

      <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="checkbox"
          checked={useTrans}
          onChange={(e) => setUseTrans(e.target.checked)}
        />
        Use useTransition for filtering
      </label>

      <input
        value={input}
        onChange={onChange}
        placeholder="Type fast here..."
        style={{
          width: "100%",
          padding: 10,
          marginTop: 12,
          fontSize: 16,
        }}
      />

      <div style={{ marginTop: 8 }}>
        {isPending ? <span>Filtering…</span> : <span>Done</span>}
        <span style={{ marginLeft: 12 }}>
          Results: {results.length.toLocaleString()}
        </span>
      </div>

      <ul
        style={{
          marginTop: 12,
          height: 360,
          overflow: "auto",
          border: "1px solid #ddd",
        }}
      >
        {results.slice(0, 200).map((x) => (
          <li key={x} style={{ padding: "4px 8px" }}>
            {x}
          </li>
        ))}
      </ul>

      <p style={{ color: "#555", marginTop: 8 }}>
        Tip: Turn the checkbox OFF and type quickly — the input should feel more
        laggy. Turn it ON — typing should stay smoother while results catch up.
      </p>
    </div>
  );
}
