def binarySearch(arr, x):
    left = 0
    right = len(arr) - 1

    while left <= right:
        middle = left + (right - left) // 2
        print("middle:", middle)

        if arr[middle] == x:
            return middle

        elif arr[middle] < x:
            left = middle + 1

        else:
            right = middle - 1

    return -1


arr = [1, 2, 3, 4, 5, 6, 7]
print(binarySearch(arr, 5))