import math


def mergesort(arr):
    if len(arr) <= 1:
        return arr 
    n=len(arr)
    mid=math.floor(n)//2
    left=mergesort(arr[:mid])
    right=mergesort(arr[mid:])
    return merge(left,right)

def merge(left,right):
    result=[]
    i=j=0
    while(i<len(left) and j<len(right)):
        if(left[i]<right[j]):
            result.append(left[i])
            i=i+1

        else:
            result.append(right[j])
            j=j+1
        result.extend(left[i:])
        result.extend(right[j:])
        return result
arr=[1,4,5,2,10,22]
res=mergesort(arr)
print("sorted array",res)

