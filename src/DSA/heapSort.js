// Heap Sort (ascending) using a Max-Heap.
// Time: O(n log n), Space: O(1) extra (in-place).

function heapifyDown(arr, i, heapSize) {
  while (true) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;

    if (left < heapSize && arr[left] > arr[largest]) largest = left;
    if (right < heapSize && arr[right] > arr[largest]) largest = right;

    if (largest === i) return;

    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    i = largest;
  }
}

export function heapSort(arr) {
  const a = arr; // sort in-place
  const n = a.length;

  // Build max-heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapifyDown(a, i, n);
  }

  // Extract max one by one to the end
  for (let end = n - 1; end > 0; end--) {
    [a[0], a[end]] = [a[end], a[0]];
    heapifyDown(a, 0, end);
  }

  return a;
}

// Example:
// const arr = [8, 3, 1, 4, 7, 0, 10, 2];
// console.log(heapSort(arr)); // [0, 1, 2, 3, 4, 7, 8, 10]

