import React from 'react';
import { newTrace, addToTrace, createKey } from './helpers';

const real=`Insertion sort is used in many real-world applications where data is being continuously added to a list, and the list needs to be kept in a sorted order. One such example is the sorting of card decks. When a new card is dealt, it is inserted into the correct position in the player's hand, keeping the hand sorted at all times. Another example is the insertion of new data into a database table with a clustered index. In this case, the new data is inserted into the correct position in the index to maintain the sorted order of the table. Insertion sort can also be used in situations where the list is already partially sorted, as it has an efficient average case time complexity of O(n^2) and a best case time complexity of O(n) when the list is already sorted.`

const code = `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currentVal = arr[i];
    let j;
    for (j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = currentVal;
  }
  return arr;
}`;

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
    
    <pre>
      
        <h1>Insertion Sort Pseudo code</h1><br/>
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
  bestCase: <span>O(n)</span>,
  space: <span>O(1)</span>
};

export default InsertionSort;
