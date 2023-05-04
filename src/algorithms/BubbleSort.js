import React from 'react';
import {
  swap,
  newTrace,
  addToTrace,
  lastSorted,
  createKey
} from './helpers';

const algorithmsteps=`Steps 1: Start with an unsorted array.

Step 2: Iterate through the array from the first element to the second-to-last element.

Step 3: For each element, compare it to the next element.

Step 4: If the current element is greater than the next element, swap them.

Step 5: Repeat steps 2-4 for each subsequent element in the array.

Step 6: After each iteration, the last element of the array will be in its correct position.

Step 7: Repeat steps 2-6 until no swaps are performed in an iteration.

Step 8: Return the sorted array.`;

const exmp=`

Let's assume we have the following unsorted array: [7, 2, 5, 1, 8, 3]

Step 1: Start with the unsorted array.

Array before sorting: [7, 2, 5, 1, 8, 3]

Step 2: Iterate through the array from the first element to the second-to-last element.

Iterating through the array:

Pass 1: [7, 2, 5, 1, 8, 3]
Pass 2: [2, 5, 1, 7, 3, 8]
Pass 3: [2, 1, 5, 3, 7, 8]
Pass 4: [1, 2, 3, 5, 7, 8]

Step 3: For each element, compare it to the next element.

Comparing each element:

Pass 1: [7 > 2, 2 < 5, 5 > 1, 1 < 7, 7 < 8, 8 > 3]
Pass 2: [2 < 5, 5 > 1, 1 > 7, 7 > 3, 3 < 8]
Pass 3: [2 > 1, 1 < 5, 5 > 3, 3 < 7]
Pass 4: [1 < 2, 2 < 3, 3 < 5, 5 < 7, 7 < 8]

Step 4: If the current element is greater than the next element, swap them.

Swapping elements:

Pass 1: [2, 7, 5, 1, 8, 3]
Pass 2: [2, 5, 1, 7, 3, 8]
Pass 3: [2, 1, 5, 3, 7, 8]
Pass 4: [1, 2, 3, 5, 7, 8]

Step 5: Repeat steps 2-4 for each subsequent element in the array.

Iterating, comparing and swapping each element:

Pass 1: [2, 5, 1, 7, 3, 8]
Pass 2: [2, 1, 5, 3, 7, 8]
Pass 3: [1, 2, 3, 5, 7, 8]

Step 6: After each iteration, the last element of the array will be in its correct position.

Pass 1: [2, 5, 1, 7, 3, 8]
Pass 2: [2, 1, 5, 3, 7, 8]
Pass 3: [1, 2, 3, 5, 7, 8]

Step 7: Repeat steps 2-6 until no swaps are performed in an iteration.

Checking if any swaps were performed:

Pass 1: [2, 5, 1, 7, 3, 8] (swaps performed)
Pass 2: [2, 1, 5, 3, 7, 8] (swaps performed)
Pass 3: [1, 2, 3, 5, 7, 8] (no swaps performed)

As no swaps were performed in the last iteration, the array is sorted and we can exit the loop.

Step 8: Return the sorted array.

Array after sorting: [1, 2, 3, 5, 7, 8]`;

const code = `void bubbleSort(int arr[], int n) {
  int i, j;
  for (i = 0; i < n-1; i++) {
      for (j = 0; j < n-i-1; j++) {
          if (arr[j] > arr[j+1]) {
              int temp = arr[j];
              arr[j] = arr[j+1];
              arr[j+1] = temp;
          }
      }
  }
}
`;


const real=`
Bubble sort is a simple and straightforward sorting algorithm. However, it is not commonly used in real-life implementations due to its slow performance compared to other more efficient algorithms. Its time complexity is O(n^2), making it inefficient for large datasets.
One example of where bubble sort could be used in real life is when sorting a small list of items in an application or program where performance is not a significant concern. For instance, if you had a list of only 10 items, bubble sort could be an appropriate algorithm to use since it would still sort the list relatively quickly.
However, in general, more efficient sorting algorithms such as quicksort, mergesort, and heapsort are used in real-life implementations where performance is critical, especially for large datasets.`;

const BubbleSort = (nums) => {
  // Set up code for tracing the algorithm
  const trace = newTrace(nums);

  // Sorting Algorithm with trace capture
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - i - 1; j++) {
      // Visualize: Comparing A[j] and A[j + 1]
      addToTrace(trace, nums, lastSorted(trace), [j, j + 1]);
      if (nums[j] > nums[j + 1]) {
        swap(nums, j, j + 1);
        // Visualize: Swap A[j] and A[j + 1]
        addToTrace(trace, nums, lastSorted(trace), [], [j, j + 1]);
      }
    }

    // Visualize: final value is sorted
    addToTrace(trace, nums, [
      ...lastSorted(trace),
      nums.length - 1 - i
    ]);
  }

  return trace;
};

export const BubbleSortKey = createKey('Comparing', 'Swapping');
export const BubbleSortDesc = {
  title: 'Bubble Sort',
  description: (
    <p>
      <a
        href="https://en.wikipedia.org/wiki/Bubble_sort"
        target="_blank"
        rel="noopener noreferrer"
      >
        Bubble Sort
      </a>{' '}
      is a simple sorting algorithm that repeatedly steps through the
      list, compares adjacent elements and swaps them if they are in the
      wrong order.The pass through the list is repeated until the list
      is sorted. The algorithm, which is a comparison sort, is named for
      the way smaller or larger elements "bubble" to the top of the
      list. Although the algorithm is simple, it is too slow and
      impractical for most problems
    </p>
  ),

  pseudo: (
    <pre>
      
        <h1>Code in C language : </h1><br/>
      {' '}
     {code}
      
    </pre>
  ),
  reallife:(
   

   <p>
    <h1>Real World Implementation</h1>

    {real}
    </p>

  ),
  algo:(
    <pre>
      <h1>ALGORITHM</h1>
      {algorithmsteps}
    </pre>
  ),
  exmp:(
    <pre>
      <h1>Bubble Sort Step-by-Step:</h1>
      {exmp}
    </pre>
  ),
  
  worstCase: (
    <span>
      O(n<sup>2</sup>)
    </span>
  ),
  avgCase: (
    <span>
      O(n<sup>2</sup>)
    </span>
  ),
  bestCase: <span>O(n)</span>,
  space: <span>O(1)</span>
};
export default BubbleSort;
