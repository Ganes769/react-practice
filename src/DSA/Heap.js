class MinHeap {
  constructor() {
    this.heap = [5, 10, 20, 30];
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }
  getLeftChildIndex(i) {
    return 2 * i + 1;
  }
  getRightChildIndex(i) {
    return 2 * i + 2;
  }
  insert(val) {
    this.heap.push(val);
    this.heapifyUp(this.heap.length - 1);
  }
  heapifyUp(i) {
    while (i > 0) {
      let parentIndex = this.getParentIndex(i);
      if (this.heap[i] < this.heap[parentIndex]) {
        [this.heap[i], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[i],
        ];
        i = parentIndex;
      } else {
        break;
      }
    }
  }
}
let heap = new MinHeap();
heap.insert(1);
function heapSort(arr) {
  let n = arr.length;
  for (let i = n - 1; i >= 0; i++) {
    heapifyDown(arr, i, n);
  }
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapifyDown(arr, 0, i);
  }
}

function heapifyDown(arr, i, n) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  if (left < n && arr[left] < arr[largest]) {
    largest = left;
  }
  if (right < n && arr[right] < arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapifyDown(arr, largest, n);
  }
}
