import React from 'react';
import { newTrace, addToTrace, createKey } from './helpers';

const algorithmsteps=`Step 1: Start with an unsorted array.

Step 2: Divide the array into two halves.

Step 3: Recursively sort the two halves using merge sort.

Step 4: Merge the sorted halves into a single sorted array.

Step 5: Return the sorted array.`

const exmp=`

Let's assume we have the following unsorted array: [7, 2, 5, 1, 8, 3]

Step 1: Start with the unsorted array.

Array before sorting: [7, 2, 5, 1, 8, 3]

Step 2: Divide the array into two halves.

[7, 2, 5] and [1, 8, 3]

Step 3: Recursively sort the two halves using merge sort.

Sorting the first half [7, 2, 5]:

Divide the array into two halves.

[7, 2] and [5]

Recursively sort the two halves using merge sort.

Sorting the first half [7, 2]:

Divide the array into two halves.

[7] and [2]

Recursively sort the two halves using merge sort.

Sorting [7]:

[7]

Sorting [2]:

[2]

Merging [7] and [2] to get [2, 7]

Merging [2, 7] and [5] to get [2, 5, 7]

Sorting the second half [1, 8, 3]:

Divide the array into two halves.

[1] and [8, 3]

Recursively sort the two halves using merge sort.

Sorting [8, 3]:

Divide the array into two halves.

[8] and [3]

Recursively sort the two halves using merge sort.

Sorting [8]:

[8]

Sorting [3]:

[3]

Merging [8] and [3] to get [3, 8]

Merging [1] and [3, 8] to get [1, 3, 8]

Step 4: Merge the sorted halves into a single sorted array.

Merging [2, 5, 7] and [1, 3, 8] to get [1, 2, 3, 5, 7, 8]

Step 5: Return the sorted array.

After step 5, the array will look like this: [1, 2, 3, 5, 7, 8]

Now, the array is sorted in ascending order.`;

const real=`One real-world implementation of merge sort is in sorting large data sets in databases. When a database query returns a large number of rows, it is often more efficient to sort the data using an algorithm like merge sort rather than in the database itself. Merge sort is also used in external sorting, where data is too large to fit in memory and must be sorted using disk-based algorithms. This is common in applications that process large files, such as sorting log files or processing large datasets. In addition, merge sort is used in distributed computing systems, where data is split across multiple nodes and then sorted using merge sort before being merged back together.`

const code = `void merge(int arr[], int l, int m, int r) {
  int i, j, k;
  int n1 = m - l + 1;
  int n2 = r - m;

  int L[n1], R[n2];

  for (i = 0; i < n1; i++)
      L[i] = arr[l + i];
  for (j = 0; j < n2; j++)
      R[j] = arr[m + 1 + j];

  i = 0;
  j = 0;
  k = l;
  while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
          arr[k] = L[i];
          i++;
      }
      else {
          arr[k] = R[j];
          j++;
      }
      k++;
  }

  while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
  }

  while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
  }
}

void mergeSort(int arr[], int l, int r) {
  if (l < r) {
      int m = l + (r - l) / 2;

      mergeSort(arr, l, m);
      mergeSort(arr, m+1, r);

      merge(arr, l, m, r);
  }
}
`;

const MergeSort = (nums) => {
  // Initial State
  const trace = newTrace(nums);

  function merge(original, start, mid, end) {
    const left = original.slice(start, mid);
    const right = original.slice(mid, end);
    let i = 0;
    let j = 0;
    let k = 0;
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        addToTrace(trace, original, [], [], [], [k + start]);
        original[k + start] = left[i];
        i++;
        addToTrace(trace, original, [], [], [], [k + start]);
      } else {
        addToTrace(trace, original, [], [], [], [k + start]);
        original[k + start] = right[j];
        j++;
        addToTrace(trace, original, [], [], [], [k + start]);
      }
      k++;
    }
    while (i < left.length) {
      addToTrace(trace, original, [], [], [], [k + start]);
      original[k + start] = left[i];
      i++;
      k++;
      addToTrace(trace, original, [], [], [], [k + start]);
    }
    while (j < right.length) {
      addToTrace(trace, original, [], [], [], [k + start]);
      original[k + start] = right[j];
      j++;
      k++;
      addToTrace(trace, original, [], [], [], [k + start]);
    }

    left.length = 0;
    right.length = 0;
  }

  function recursiveMergeSort(original, start, end) {
    const length = end - start;
    if (length < 2) {
      // original = []
      if (length < 1) return original;
      // original = [x]
      else return [original[start]];
    }

    const midPoint = Math.floor((start + end) / 2);

    // Visualize: First Half
    addToTrace(
      trace,
      original,
      [],
      [...Array(midPoint - start).keys()].map((i) => i + start)
    );
    recursiveMergeSort(original, start, midPoint);

    // Visualize: Second Half
    addToTrace(
      trace,
      original,
      [],
      [...Array(end - midPoint).keys()].map((i) => i + midPoint)
    );
    recursiveMergeSort(original, midPoint, end);

    merge(original, start, midPoint, end);
  }

  recursiveMergeSort(nums, 0, nums.length);

  // Visualize: Mark all elements as sorted
  addToTrace(trace, nums, [...Array(nums.length).keys()]);
  return trace;
};

export const MergeSortKey = createKey(
  'Call Merge Sort',
  null,
  'Overwrite from axillary array'
);
export const MergeSortDesc = {
  title: 'Merge Sort',
  description: (
    <div>
      <p>
        <a
          href="https://en.wikipedia.org/wiki/Merge_sort"
          target="_blank"
          rel="noopener noreferrer"
        >
          Merge Sort
        </a>{' '}
        is an efficient, stable sorting algorith that makes use of the
        divide and conquer strategy. Conceptually the algorithm works as
        follows:
      </p>
      <ol>
        <li>
          Divide the unsorted list into <em>n</em> sublists, each
          containing one element(a list of one element is considered
          sorted)
        </li>
        <li>
          Repeatedly merge sublists to produce new sorted sublists until
          there is only one sublist remaining. This will be the sorted
          list.
        </li>
      </ol>
    </div>
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
      <h1>Merge Sort Step-by-Step:</h1>
      {exmp}
    </pre>
  ),
  worstCase: (
    <span>
      O(<em>n</em> log <em>n</em>)
    </span>
  ),
  avgCase: (
    <span>
      O(<em>n</em> log <em>n</em>)
    </span>
  ),
  bestCase: (
    <span>
      O(<em>n</em> log <em>n</em>)
    </span>
  ),
  space: (
    <span>
      O(<em>n</em>)
    </span>
  )
};
export default MergeSort;
