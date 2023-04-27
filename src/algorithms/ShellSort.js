import React from 'react';
import {
  swap,
  newTrace,
  addToTrace,
  createRange,
  createKey
} from './helpers';

const ShellSort = (nums) => {
  const trace = newTrace(nums);

  for (
    let gap = Math.floor(nums.length / 2);
    gap > 0;
    gap = Math.floor(gap / 2)
  ) {
    for (let j = gap; j < nums.length; j++) {
      for (let i = j - gap; i >= 0; i -= gap) {
        addToTrace(trace, nums, [], [i, i + gap]);
        if (nums[i + gap] < nums[i]) {
          addToTrace(trace, nums, [], [], [i, i + gap]);
          swap(nums, i, i + gap);
          addToTrace(trace, nums, [], [], [i, i + gap]);
        } else {
          break;
        }
      }
    }
  }

  addToTrace(trace, nums, createRange(0, nums.length));
  return trace;
};

export const ShellSortKey = createKey('Comparing', 'Swapping');

export const ShellSortDesc = {
  title: 'Shell Sort',
  description: (
    <div>
      <p>
        <a
          href="https://en.wikipedia.org/wiki/Shellsort"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shell Sort
        </a>
        , also know as Shell's method is a generalization of insertion
        sort where elements <em>gap</em> distance apart are compared
        rather than adjacent elements. The method starts by sorting
        pairs of elements far apart from each other, then progressively
        reducing the gap between elements to be compared. Starting with
        far apart elements, it can move some out-of-place elements into
        position faster than a simple nearest neighbor exchange. The
        running time of Shellsort is heavily dependent on the gap
        sequence it uses. For many practical variants, determining their
        time complexity remains an open problem. It is in-place sorting
        algorithm that is not stable.
      </p>
    </div>
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
      O(<em>n</em>
      <sup>2</sup>)
    </span>
  ),
  avgCase: (
    <span>
      O(<em>n</em>
      <sup>3/2</sup>)
    </span>
  ),
  bestCase: (
    <span>
      O(<em>n</em> log <em>n</em>)
    </span>
  ),
  space: <span>O(1)</span>
};

export default ShellSort;
