import React from 'react';
import {
  swap,
  newTrace,
  addToTrace,
  lastSorted,
  createRange,
  createKey
} from './helpers';

const algorithmsteps=`Step 1: Start with an unsorted array.

Step 2: Build a max heap from the array. This is done by repeatedly comparing each node with its children, and swapping them if necessary until the entire tree satisfies the max heap property.

Step 3: Swap the root node (which contains the largest element) with the last element in the array.

Step 4: Reduce the heap size by one.

Step 5: Restore the max heap property by sifting down the new root node.

Step 6: Repeat steps 3-5 until the heap size is one.

Step 7: The array is now sorted in ascending order.`;



const exmp=`Let's assume we have the following unsorted array: [7, 2, 5, 1, 8, 3]

Step 1: Build a max heap from the array.

After building the max heap, the array will look like this: [8, 7, 5, 1, 2, 3]

Step 2: Swap the root node (8) with the last element in the array (3).

Array after step 2: [3, 7, 5, 1, 2, 8]

Step 3: Reduce the heap size by one.

Heap size after step 3: 5

Step 4: Restore the max heap property by sifting down the new root node (3).

After sifting down the new root node, the array will look like this: [7, 3, 5, 1, 2, 8]

Step 5: Repeat steps 3-5 until the heap size is one.

After step 5, the array will look like this: [2, 3, 5, 1, 7, 8]

After step 6, the array will look like this: [1, 3, 5, 2, 7, 8]

After step 7, the array will look like this: [1, 2, 5, 3, 7, 8]

After step 8, the array will look like this: [1, 2, 3, 5, 7, 8]

Now, the array is sorted in ascending order.`;

const real=`

Heap sort is a popular sorting algorithm that is commonly used in real-world applications. One common real-life application of heap sort is in the implementation of priority queues. Priority queues are data structures that store elements with associated priorities, and allow the highest-priority element to be retrieved first.

Heap sort is used to implement the priority queue because the heap data structure provides efficient operations for adding and removing elements with the highest priority. The heap data structure is a binary tree where each node is greater than or equal to its children. This ensures that the highest-priority element is always at the root of the tree, making it easy to retrieve.

When new elements are added to the priority queue, they are inserted into the heap in the correct position based on their priority. When elements are removed from the priority queue, the root of the heap is removed and the remaining elements are reorganized to maintain the heap property.

In addition to priority queues, heap sort can also be used for other applications where efficient sorting is needed, such as in database indexing or in sorting large datasets in memory-constrained environments.`

const code = `void heapify(int arr[], int n, int i) {
  int largest = i; 
  int l = 2*i + 1; 
  int r = 2*i + 2; 

  if (l < n && arr[l] > arr[largest]) 
      largest = l; 

  if (r < n && arr[r] > arr[largest]) 
      largest = r; 

  if (largest != i) { 
      int temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;

      heapify(arr, n, largest); 
  } 
}

void heapSort(int arr[], int n) {
  int i;
  for (i = n / 2 - 1; i >= 0; i--) 
      heapify(arr, n, i); 

  for (i = n-1; i >= 0; i--) { 
      int temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;

      heapify(arr, i, 0); 
  } 
}
`;

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
      <h1>Heap Sort Step-by-Step:</h1>
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
  space: <span>O(1)</span>
};

export default HeapSort;
