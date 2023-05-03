import React from 'react';
import {
  swap,
  newTrace,
  addToTrace,
  createRange,
  createKey
} from './helpers';

const code = `function shellSort(arr) {
  let n = arr.length;

  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Do a gapped insertion sort for this gap size.
    // The first gap elements arr[0..gap-1] are already in gapped order
    // keep adding one more element until the entire array is gap sorted
    for (let i = gap; i < n; i++) {
      // add arr[i] to the elements that have been gap sorted
      // save arr[i] in temp and make a hole at position i
      let temp = arr[i];

      // shift earlier gap-sorted elements up until the correct location for arr[i] is found
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }

      // put temp (the original arr[i]) in its correct location
      arr[j] = temp;
    }
  }
  return arr;
}`


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
    <pre>
      
        <h1>Bubble Sort Pseudo code</h1><br/>
      {' '}
      {code}
      
    </pre>
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
