import { useState } from "react";

export default function HookCounterFour() {
  interface ItemType {
    id: number;
    value: number;
  }
  const [items, setItems] = useState<ItemType[]>([]);
  function addItem() {
    setItems([
      ...items,
      { id: items.length, value: Math.floor(Math.random() * 10 + 1) },
    ]);
  }

  return (
    <div>
      <div onClick={addItem}>add Item</div>
      {items.map((item) => (
        <li key={item.id}>{item.value}</li>
      ))}
    </div>
  );
}
