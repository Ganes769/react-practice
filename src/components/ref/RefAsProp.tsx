import React, { forwardRef } from "react";

// before react 19 passing ref as a prop, we need to forward the ref to the component
export const Input = forwardRef<HTMLInputElement, { label: string }>(
  function Input({ label }, ref) {
    console.log(ref);
    return (
      <div>
        <label>{label}</label>
        <input type="text" ref={ref} />
      </div>
    );
  }
);
// After react 19 we can pass ref as a prop to the component
export default function InputRefAsProp({
  label,
  ref,
}: {
  label: string;
  ref: React.Ref<HTMLInputElement>;
}) {
  console.log(ref);
  return (
    <div>
      <label>{label}</label>
      <input type="text" ref={ref} />
    </div>
  );
}
