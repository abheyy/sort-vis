import React from 'react';
import { newTrace, addToTrace, createKey } from './helpers';

const InsertionSort = (nums) => {
  // Initial State
  const trace = newTrace(nums);

  // Core Algorithm
  for (let i = 1; i < nums.length; i++) {
    let value = nums[i];
    let hole = i;
    // Visualize: Hole has been selected for comparison
    addToTrace(trace, nums, [], [i]);
    while (hole > 0 && nums[hole - 1] > value) {
      // Visualize: Compare hole to value
      addToTrace(trace, nums, [], [hole], [hole - 1]);
      nums[hole] = nums[hole - 1];
      hole -= 1;
      // Visualize: Overwrite hole with hole - 1
      addToTrace(trace, nums, [], [], [hole, hole + 1]);
    }
    // Visualize: Overwrite hole with value
    addToTrace(trace, nums, [], [], [], [hole]);
    nums[hole] = value;
    // Visualize: value is in sorted position
    addToTrace(trace, nums, [], [], [], [hole]);
  }

  // Visualize: Mark all elements as sorted
  addToTrace(trace, nums, [...Array(nums.length).keys()]);
  return trace;
};

export const InsertionSortKey = createKey(
  'Comparing',
  'Swapping',
  'Overwrite from memory'
);
export const InsertionSortDesc = {
  title: 'Insertion Sort',
  description: (
    <p>
      <a
        href="https://en.wikipedia.org/wiki/Insertion_sort"
        target="_blank"
        rel="noopener noreferrer"
      >
        Insertion Sort
      </a>{' '}
      is a simple sorting algorithm that iterates through an array and
      at each iteration it removes one element from the array, finds the
      location it belongs to in the sorted list and inserts it there,
      repeating until no elements remain in the unsorted list. It is an
      in-place, stable sorting algorithm that is inefficient on large
      input arrays but works well for data sets that are almost sorted.
      It is more efficient in practice compared to other quadratic
      sorting algorithms like bubble sort and selection sort.
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

export default InsertionSort;
