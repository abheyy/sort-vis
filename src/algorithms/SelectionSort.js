import React from 'react';
import {
  swap,
  newTrace,
  addToTrace,
  lastSorted,
  createKey
} from './helpers';

const real=`One real-world application of selection sort is in music sorting. When a user selects the option to sort their music by song title, artist name, or album, the music player software may use selection sort to sort the tracks based on the user's choice. For example, if the user chooses to sort by song title, the music player will use selection sort to sort the songs alphabetically by title. The same approach could be used to sort playlists, where the user can select to sort the songs in the playlist by name, length, or artist. Selection sort can be used in this scenario because the sorting is relatively simple, and the number of songs in a playlist or music library is typically not very large.`

const code = `function selectionSort(arr) {
  let len = arr.length;
  let min;

  for (let i = 0; i < len - 1; i++) {
    min = i;

    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }

    if (min !== i) {
      swap(arr, i, min);
    }
  }

  return arr;
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}`;

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
    <pre>
      
        <h1>Selection Sort Pseudo code</h1><br/>
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
