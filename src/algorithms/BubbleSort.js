import React from 'react';
import {
  swap,
  newTrace,
  addToTrace,
  lastSorted,
  createKey
} from './helpers';

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
    <p>
      
        <h1>Bubble Sort Pseudo code</h1><br/>
      {' '}
step 1.Start with an array of unsorted numbers<br/>
step 2.Define a function called “bubbleSort” that takes in the array and the length of the array as parameters<br/>
step 3.In the function, create a variable called “sorted” that is set to true<br/>
step 4.Create a for loop that iterates through the array starting at index 0 and ending at the length of the array -1<br/>
step 5.Within the for loop, compare the current element with the next element in the array<br/>
step 6.If the current element is greater than the next element, swap their positions and set “sorted” to false<br/>
step 7.After the for loop, check if “sorted” is false<br/>
step 8.If “sorted” is false, call the “bubbleSort” function again with the same array and length as parameters<br/>
step 9.If “sorted” is true, the array is now sorted and the function will return the sorted array<br/>
step 10.Call the “bubbleSort” function with the initial unsorted array and its length as parameters to begin the sorting process.<br/>
      
    </p>
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
