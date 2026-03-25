// function quickSort(arr, startIndex = 0, endIndex = arr.length - 1) {
//   if (startIndex < endIndex) {
//     let pivotIndex = findPivotIndex(arr, startIndex, endIndex); // Fixed name
//     quickSort(arr, startIndex, pivotIndex - 1);
//     quickSort(arr, pivotIndex + 1, endIndex);
//   }
//   return arr;
// }

// function findPivotIndex(arr, startIndex, endIndex) {
//   let pivot = arr[endIndex];
//   let pos = startIndex - 1; // Robust for subarrays
//   for (let i = startIndex; i < endIndex; i++) {
//     if (arr[i] < pivot) {
//       pos++;
//       [arr[pos], arr[i]] = [arr[i], arr[pos]];
//     }
//   }
//   [arr[pos + 1], arr[endIndex]] = [arr[endIndex], arr[pos + 1]];
//   return pos + 1;
// }

// const result = quickSort(); // Filled gap with 4
// console.log(result); // [0, 1, 2, 3, 4, 7, 8, 10]

const arr = [8, 3, 1, 4, 7, 0, 10, 2];
function quickSort(arr, startIndex = 0, endIndex = arr.length - 1) {
  if (startIndex < endIndex) {
    let pivotIndex = getPivotIndex(arr, startIndex, endIndex);

    quickSort(arr, startIndex, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, endIndex);
  }
  return arr;
}
function getPivotIndex(arr, startIndex, endIndex) {
  let pivot = arr[endIndex];
  let pos = startIndex - 1;
  for (let i = startIndex; i < endIndex; i++) {
    if (arr[i] < pivot) {
      pos++;
      [arr[i], arr[pos]] = [arr[pos], arr[i]];
    }
  }
  [arr[pos + 1], arr[endIndex]] = [arr[endIndex], arr[pos + 1]];
  return pos + 1;
}

const result = quickSort([8, 3, 1, 4, 7, 0, 10, 2]);
console.log(result);
