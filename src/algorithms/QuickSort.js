import React from 'react';
import {
  swap,
  newTrace,
  addToTrace,
  lastSorted,
  createRange,
  createKey
} from './helpers';

const algorithmsteps=`Step 1: Start with an unsorted array and choose a pivot element.

Step 2: Partition the array into two sub-arrays - one with elements smaller than the pivot and one with elements greater than the pivot.

Step 3: Recursively repeat the above step for each sub-array.

Step 4: Concatenate the sorted sub-arrays to get the final sorted array.`

const exmp=`

Let's assume we have the following unsorted array: [7, 2, 5, 1, 8, 3]

Step 1: Start with the unsorted array and choose a pivot element.

We choose the last element (3) as the pivot.

Array before sorting: [7, 2, 5, 1, 8, 3]

Step 2: Partition the array into two sub-arrays - one with elements smaller than the pivot and one with elements greater than the pivot.

[2, 1, 3] [7, 5, 8]

Step 3: Recursively repeat the above step for each sub-array.

Sorting [2, 1, 3]:

We choose the last element (3) as the pivot.

[2, 1] [3]

We choose the last element (1) as the pivot.

[1] [2]

Sorting [7, 5, 8]:

We choose the last element (8) as the pivot.

[7, 5] [8]

We choose the last element (5) as the pivot.

[5] [7]

Step 4: Concatenate the sorted sub-arrays to get the final sorted array.

[1, 2, 3] [5, 7, 8]

Concatenating the sub-arrays to get [1, 2, 3, 5, 7, 8]

Step 5: Return the sorted array.

After step 5, the array will look like this: [1, 2, 3, 5, 7, 8]

Now, the array is sorted in ascending order.`;

const real=`Quick sort is used in many applications where a fast and efficient sorting algorithm is required. Some examples of its real-world implementation are:

1. Computer Science: Quick sort is used in many computer science applications like database indexing, compiler implementation, and file search algorithms.

2. Finance: Quick sort is used in finance applications to sort financial data like stocks, bonds, and other investment instruments. 

3. Medicine: Quick sort is used in medical applications to sort medical records and patient data.

4. Image Processing: Quick sort is used in image processing applications for sorting pixels and image data.

5. Natural Language Processing: Quick sort is used in natural language processing applications to sort words and phrases.`

const code=`int partition(int arr[], int low, int high) {
  int pivot = arr[high];
  int i = low - 1;
  int j;

  for (j = low; j <= high-1; j++) {
      if (arr[j] < pivot) {
          i++;
          int temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
      }
  }
  int temp = arr[i+1];
  arr[i+1] = arr[high
`;


const QuickSort = (nums) => {
  // Initial State
  const trace = newTrace(nums);

  function choosePivot(array, start, end) {
    // randomly pick an element between start and end;
    return Math.floor(Math.random() * (end - start)) + start;
  }

  function partition(array, start, end) {
    let i = start + 1;
    let j = start + 1;

    // Visualize: Keep pivot marked
    addToTrace(trace, array, lastSorted(trace), [start]);

    while (j <= end) {
      if (array[j] < array[start]) {
        // Visualize: Mark item that is less than pivot
        addToTrace(
          trace,
          array,
          lastSorted(trace),
          [start],
          [j],
          [],
          createRange(start + 1, i)
        );

        swap(array, i, j);

        // Visualize: Move item to lesser list
        addToTrace(
          trace,
          array,
          lastSorted(trace),
          [start],
          [i],
          [],
          createRange(start + 1, i)
        );
        i += 1;
      }
      j += 1;
    }

    // Visualize: Mark center position
    addToTrace(
      trace,
      array,
      lastSorted(trace),
      [i - 1],
      [],
      [],
      createRange(start, i - 1)
    );
    swap(array, start, i - 1);

    // Visualize: Move pivot to center
    addToTrace(
      trace,
      array,
      lastSorted(trace),
      [i - 1],
      [],
      [],
      createRange(start, i - 1)
    );
    return i - 1;
  }

  function recursiveQuickSort(array, start, end) {
    if (start >= end) {
      if (start === end) {
        // Visualize: Mark only item as sorted
        addToTrace(trace, array, [...lastSorted(trace), start]);
      }
      return null;
    }

    let pivot = choosePivot(array, start, end);

    // Visualize: Mark chosen pivot
    addToTrace(trace, array, lastSorted(trace), [pivot]);

    swap(array, start, pivot);

    // Visualize: Move chosen pivot to start
    addToTrace(trace, array, lastSorted(trace), [pivot]);

    pivot = partition(array, start, end);

    // Visualize: Mark pivot after partition as sorted
    addToTrace(trace, array, [...lastSorted(trace), pivot]);

    recursiveQuickSort(array, start, pivot - 1);
    recursiveQuickSort(array, pivot + 1, end);
  }

  recursiveQuickSort(nums, 0, nums.length - 1);

  return trace;
};

export const QuickSortKey = createKey(
  'Comparing',
  'Swapping',
  null,
  'Less than pivot'
);

export const QuickSortDesc = {
  title: 'Quick Sort',
  description: (
    <div>
      <p>
        <a
          href="https://en.wikipedia.org/wiki/Quicksort"
          target="_blank"
          rel="noopener noreferrer"
        >
          Quick Sort
        </a>{' '}
        is an efficient, in-place sorting algorith that in practice is
        faster than MergeSort and HeapSort. However, it is not a stable
        sorting algorithm, meaning that the relative positioning of
        equal sort items is not preserved.Quicksort is a divide and
        conquer algorithm. Quicksort first divides a large array into
        two smaller sub-arrays: the low elements and the high elements.
        Quicksort can then recursively sort the sub-arrays. The steps
        are:
      </p>
      <ol>
        <li>
          Pick an element, called a pivot, from the array. This is
          usually done at random.
        </li>
        <li>Move pivot element to the start of the array.</li>
        <li>
          <em>Partitioning:</em> reorder the array so that all elements
          with values less than the pivot come before the pivot, while
          all elements with values greater than the pivot come after it
          (equal values can go either way). After this partitioning, the
          pivot is in its final position. This is called the{' '}
          <em>partition</em> operation.
        </li>
        <li>
          Recursively apply the above steps to the sub-array of elements
          with smaller values and separately to the sub-array of
          elements with greater values.
        </li>
      </ol>
      <p>
        The base case of the recursion is an array of size zero or one,
        which are sorted by definition.
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
      <h1>Quick Sort Step-by-Step:</h1>
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
      O(<em>n</em>log<em>n</em>)
    </span>
  ),
  bestCase: (
    <span>
      O(<em>n</em>log<em>n</em>)
    </span>
  ),
  space: (
    <span>
      O(log<em>n</em>)
    </span>
  )

};

export default QuickSort;
