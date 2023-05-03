import React from 'react';
import {
  swap,
  newTrace,
  addToTrace,
  lastSorted,
  createRange,
  createKey
} from './helpers';

const real=`Heap sort is a popular sorting algorithm that is commonly used in real-world applications. One common real-life application of heap sort is in the implementation of priority queues. Priority queues are data structures that store elements with associated priorities, and allow the highest-priority element to be retrieved first.

Heap sort is used to implement the priority queue because the heap data structure provides efficient operations for adding and removing elements with the highest priority. The heap data structure is a binary tree where each node is greater than or equal to its children. This ensures that the highest-priority element is always at the root of the tree, making it easy to retrieve.

When new elements are added to the priority queue, they are inserted into the heap in the correct position based on their priority. When elements are removed from the priority queue, the root of the heap is removed and the remaining elements are reorganized to maintain the heap property.

In addition to priority queues, heap sort can also be used for other applications where efficient sorting is needed, such as in database indexing or in sorting large datasets in memory-constrained environments.`

const code = `function heapSort(arr) {
  let len = arr.length;

  // Build max heap
  for (let i = Math.floor(len / 2); i >= 0; i--) {
    heapify(arr, len, i);
  }

  // Heap sort
  for (let i = len - 1; i >= 0; i--) {
    swap(arr, 0, i);
    heapify(arr, i, 0);
  }

  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    swap(arr, i, largest);
    heapify(arr, n, largest);
  }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}`;

const HeapSort = (nums) => {
  const trace = newTrace(nums);

  // Helper functions to quickly access nodes
  const left = (i) => 2 * i + 1;
  const right = (i) => 2 * i + 2;
  const parent = (i) => Math.floor((i - 1) / 2);

  const maxHeapify = (array, i, heapsize) => {
    const leftChild = left(i);
    const rightChild = right(i);

    // Visualize: Compare parent and leftChild
    addToTrace(trace, array, lastSorted(trace), [i, leftChild]);

    let largest =
      leftChild < heapsize && array[leftChild] > array[i]
        ? leftChild
        : i;

    // Visualize: Compare largest and rightChild
    addToTrace(trace, array, lastSorted(trace), [largest, rightChild]);

    if (rightChild < heapsize && array[rightChild] > array[largest])
      largest = rightChild;

    if (largest !== i) {
      // Visualize: Select largest child and parent
      addToTrace(trace, array, lastSorted(trace), [], [i, largest]);

      swap(array, i, largest);

      // Visualize: Swap largest child and parent
      addToTrace(trace, array, lastSorted(trace), [], [i, largest]);

      maxHeapify(array, largest, heapsize);
    }
  };

  const BuildMaxHeap = (array) => {
    const start = Math.floor(array.length / 2);
    const heapsize = array.length;
    for (let i = start; i >= 0; i--) {
      maxHeapify(array, i, heapsize);
    }

    // Visualize: Mark heap as built
    addToTrace(
      trace,
      array,
      lastSorted(trace),
      [],
      [],
      [],
      createRange(0, array.length)
    );
  };

  const heapSort = (array) => {
    BuildMaxHeap(array);
    let heapsize = array.length;
    for (let i = array.length - 1; i > 0; i--) {
      // Visualize: Select Maximum
      addToTrace(trace, array, lastSorted(trace), [], [0, i]);

      swap(array, 0, i);
      heapsize -= 1;

      // Visualize: Swap with last element in heap
      addToTrace(trace, array, [...lastSorted(trace), i], [], [0, i]);

      maxHeapify(array, 0, heapsize);

      // Visualize: Heap created
      addToTrace(
        trace,
        array,
        lastSorted(trace),
        [],
        [],
        [],
        createRange(0, heapsize)
      );
    }
    addToTrace(trace, array, [...lastSorted(trace), 0]);
  };

  // Execute Heapsort
  heapSort(nums);
  return trace;
};

export const HeapSortKey = createKey(
  'Comparing',
  'Swapping',
  null,
  'Heap Built'
);

export const HeapSortDesc = {
  title: 'Heap Sort',
  description: (
    <div>
      <p>
        <a
          href="https://en.wikipedia.org/wiki/Heapsort"
          target="_blank"
          rel="noopener noreferrer"
        >
          Heap Sort
        </a>{' '}
        can be thought of as an improved selection sort that uses the
        heap data structure rather than a linear-time search to find the
        maximum or minimum element. It is an in-place sorting algorithm
        that is not stable and has a somewhat slower running time than
        Quicksort in practice.
      </p>
      <p>
        The heapsort algorithm can be divided into two parts. In the
        first step, a heap is built out of the data. The heap is often
        placed in an array with the layout of a complete binary tree. In
        the second step, a sorted array is created by repeatedly
        removing the largest element from the heap (the root of the
        heap), and inserting it into the array. The heap is updated
        after each removal to maintain the heap property. Once all
        objects have been removed from the heap, the result is a sorted
        array.
      </p>
      <ol>
        <li>
          Call the buildMaxHeap() function on the list. Also referred to
          as heapify(), this builds a heap from a list in O(n)
          operations.
        </li>
        <li>
          Swap the first element of the list with the final element.
          Decrease the considered range of the list by one.
        </li>
        <li>
          Call the <em>siftDown()</em>, also called{' '}
          <em>maxHeapify()</em> function on the list to sift the new
          first element to its appropriate index in the heap.
        </li>
        <li>
          Go to step (2) unless the considered range of the list is one
          element.
        </li>
      </ol>
    </div>
  ),

  pseudo: (
    <pre>
      
        <h1>Heap Sort Pseudo code</h1><br/>
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
  space: <span>O(1)</span>
};

export default HeapSort;
