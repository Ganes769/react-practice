import React, { useState } from "react";
interface Order {
  id: number;
  type: "capacinno" | "Latte" | "Mocca";
  price: number;
  quantity: number;
}
export default function AntiPattern() {
  const [order, setorder] = useState<Order[]>([
    { id: 1, type: "Latte", price: 20, quantity: 2 },
    { id: 2, type: "Mocca", price: 5, quantity: 2 },
  ]);
  const total = order.reduce(
    (acc, order) => acc + order.price * order.quantity,
    0
  );
  //Dont need to add useeffect here because it is not a side effect
  console.log(total);
  return (
    <div>
      {order.map((item) => (
        <div>
          <p>{item.type}</p>
          <p>{item.quantity}</p>
          <p>{item.price}</p>
        </div>
      ))}
      <div>Total: {total}</div>
    </div>
  );
}
