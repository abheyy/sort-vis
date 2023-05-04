import React from 'react';
import {
  swap,
  newTrace,
  addToTrace,
  createRange,
  createKey
} from './helpers';


const algorithmsteps=`Step 1: Start with an unsorted array and choose a gap value.

Step 2: Divide the array into sub-arrays of size gap and sort each sub-array using Insertion Sort.

Step 3: Reduce the gap value and repeat step 2 until the gap value is 1.

Step 4: Perform one final Insertion Sort on the entire array.

step 5 :Return the sorted array.`


const exmp=`

Let's assume we have the following unsorted array: [7, 2, 5, 1, 8, 3]

Step 1: Start with the unsorted array and choose a gap value.

We choose a gap value of 3.

Array before sorting: [7, 2, 5, 1, 8, 3]

Step 2: Divide the array into sub-arrays of size gap and sort each sub-array using Insertion Sort.

Sub-array 1: [7, 1]

Sub-array 2: [2, 8]

Sub-array 3: [5, 3]

Sorting each sub-array using Insertion Sort:

Sub-array 1 after sorting: [1, 7]

Sub-array 2 after sorting: [2, 8]

Sub-array 3 after sorting: [3, 5]

Array after sorting each sub-array: [1, 7, 2, 8, 3, 5]

Step 3: Reduce the gap value and repeat step 2 until the gap value is 1.

We reduce the gap value to 1.

Sub-array 1: [1, 7, 2, 8, 3, 5]

Sorting the entire array using Insertion Sort:

Array after sorting: [1, 2, 3, 5, 7, 8]

Step 4: Perform one final Insertion Sort on the entire array.

Array after final Insertion Sort: [1, 2, 3, 5, 7, 8]

Step 5: Return the sorted array.

After step 5, the array will look like this: [1, 2, 3, 5, 7, 8]

Now, the array is sorted in ascending order.`;

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
      
        <h1>Code in C language : </h1><br/>
      {' '}
      {code}
      
    </pre>
  ),
  algo:(
    <pre>
      <h1>ALGORITHM</h1>
      {algorithmsteps}
    </pre>
  ),
  exmp:(
    <pre>
      <h1>Shell Sort Step-by-Step:</h1>
      {exmp}
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
