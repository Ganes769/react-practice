import { Suspense } from "react";
import LinkedList from "./DSA/LinkedList/LinkedList";
import TimeComplexity from "./DSA/TimeComplexity";
import Trees from "./DSA/Tree/Trees";
import HeapVisualizer from "./DSA/HeapVisualizer";
import BacktrackingVisualizer from "./DSA/Backtracking/BacktrackingVisualizer";
import QuickSortVisualizer from "./DSA/QuickSortVisualizer";
import UseHookTest from "./components/Use";
import Optimistic from "./components/useOptimistic";

function App() {
  return (
    <>
      <TimeComplexity />
      <Trees />
      <HeapVisualizer />
      <QuickSortVisualizer />
      <BacktrackingVisualizer />
      <LinkedList />
      <Suspense fallback={<p>Loading user...</p>}>
        <UseHookTest />
      </Suspense>
      <Optimistic />
    </>
  );
}

export default App;
