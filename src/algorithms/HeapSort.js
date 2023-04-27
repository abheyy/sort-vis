import React from 'react';
import {
  swap,
  newTrace,
  addToTrace,
  lastSorted,
  createRange,
  createKey
} from './helpers';

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
