import React from 'react';
import {
  swap,
  newTrace,
  addToTrace,
  lastSorted,
  createKey
} from './helpers';

const SelectionSort = (nums) => {
  // Initial State
  const trace = newTrace(nums);

  // Core Algorithm
  for (let i = 0; i < nums.length - 1; i++) {
    // Internal Loop: Find index of min value
    let minIndex = i;
    for (let j = i + 1; j < nums.length; j++) {
      // Visualize: comparing A[j] to A[minIndex]
      addToTrace(trace, nums, lastSorted(trace), [minIndex, j]);
      if (nums[j] < nums[minIndex]) {
        // Visualize: discovered new minIndex
        addToTrace(trace, nums, lastSorted(trace), [minIndex], [j]);
        minIndex = j;
        // Visualize: reassign new minIndex;
        addToTrace(trace, nums, lastSorted(trace), [minIndex], [j]);
      }
    }

    // Visualize: i'th value to be swapped with min value
    addToTrace(trace, nums, lastSorted(trace), [], [i, minIndex]);

    swap(nums, i, minIndex);

    // Visualize: i'th value has been swapped with min value
    addToTrace(trace, nums, [...lastSorted(trace), i], [], []);
  }

  // Visualize: Final item in the array is sorted
  addToTrace(trace, nums, [...lastSorted(trace), nums.length - 1]);

  return trace;
};

export const SelectionSortKey = createKey('Comparing', 'Swapping');

export const SelectionSortDesc = {
  title: 'Selection Sort',
  description: (
    <p>
      <a
        href="https://en.wikipedia.org/wiki/Selection_sort"
        target="_blank"
        rel="noopener noreferrer"
      >
        Selection Sort
      </a>{' '}
      is an in-place comparison sorting algorithm that divides the input
      list into two parts: the sublist of items already sorted, which is
      built up from left to right at the front (left) of the list, and
      the sublist of items remaining to be sorted that occupy the rest
      of the list. Initially, the sorted sublist is empty and the
      unsorted sublist is the entire input list. The algorithm proceeds
      by finding the smallest element in the unsorted sublist,
      exchanging (swapping) it with the leftmost unsorted element
      (putting it in sorted order), and moving the sublist boundaries
      one element to the right.
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
  bestCase: (
    <span>
      O(n<sup>2</sup>)
    </span>
  ),
  space: <span>O(1)</span>
};

export default SelectionSort;
