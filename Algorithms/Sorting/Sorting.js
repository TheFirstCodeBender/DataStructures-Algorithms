//Bubble Sort my solution
const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

function bubbleSort(array) {
  let i = 0
  let j = 1
  let temp = 0
  let count = 0
  while (true) {
    if (array[i] > array[j]) {
      temp = array[j]
      array[j] = array[i]
      array[i] = temp
    }
    i++
    j++
    if( j === array.length) {
      i = 0
      j = 1
      count += 1
    }
    if ( count === array.length) {
      return array
    }
  }
}

bubbleSort(numbers);
console.log(numbers);

//Andrei's Solution
function bubbleSort2(array) {
    const length = array.length;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (array[j] > array[j + 1]) {
                //Swap numbers
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
}

bubbleSort2(numbers);
console.log(numbers)


//Selection Sort

function selectionSort(array) {
  let lowest
  let temp 
  for (let i = 0; i < array.length;i++) {
    for(let j = 0; j < array.length; j++) {
      if (i === j) {
        lowest = array[j]
        temp = j
      }
      if (array[j] < lowest) {
        lowest = array[j]
        temp = j
      }
    }
    
    array[temp] = array[i]
    array[i] = lowest
  }
  return array
}
console.log(selectionSort(numbers))
console.log(numbers);

//InsertionSort

function insertionSort(array) {
  const length = array.length;
  for (let i = 0; i < length; i++ ) {
    if (array[i] < array[0]) {
      //move number to the first position
      array.unshift(array.splice(i,1)[0]);
    } else {
      //find where number should go
      for (let j = 1; j < i; j++) {
        if (array[i] > array[j-1] && array[i] < array[j]) {
          //move number to the right spot
          array.splice(j,0,array.splice(i,1)[0]);
        }
      }
    }
  }
}

insertionSort(numbers);
console.log(numbers);



//MergeSort algorithm
function mergeSort (array) {
  if (array.length === 1){
    return array
  }
  // To split in half we need to figure out the middle
  const middle = Math.floor(array.length / 2)
  
  // Split Array in into right and left
  const left = array.slice(0,middle)

  const right = array.slice(middle)
  

  
  return merge(
    mergeSort(left),
    mergeSort(right)
  )
}

// merge the left and right arrays
function merge(left, right){
  // create initial result array and index pointers for left and right index
  let result = [], leftIndex = 0, rightIndex = 0

  //concatenate values together while comparing the left index to right
  //and put them in the result in order
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++ // move left array pointer
    } else {
      result.push(right[rightIndex]);
      rightIndex++; // move right array pointer
    }
  }

  //At the end we need to concat here because there will be one element remaining
  //either from the left or the right
  return result
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

const answer = mergeSort(numbers);
console.log(answer);

//QuickSort Algorithm

function quickSort(array, left, right){
if (left < right) {
  const index = partition(array, left, right);
  quickSort(array, left, index - 1);
  quickSort(array, index, right);
}
}

function partition(array, left, right) {
    //Pivot will be in the middle since picking the first or last index
  //could result in an O^2 time complexity.
  let pivot = Math.floor((left+right) / 2);
  let pivotVal = array[pivot];

  //loop until the left index is more than the right index
  while (left <= right) {
    while (array[left] < pivotVal) {
      left++;
    }
    while (array[right] > pivotVal) {
      right--;
    }
    if (left <= right) {
      // swap
      let temp = array[left];
      array[left] = array[right];
      array[right] = temp;

      left++;
      right--;
    }
  }
  return left;
}
//Select first and last index as 2nd and 3rd parameters
quickSort(numbers, 0, numbers.length - 1);
console.log(numbers);

//Exercise to determine Best sorting algorithm based off of situation

//#1 - Sort 10 schools around your house by distance:
//Insertion sort

//#2 - eBay sorts listings by the current Bid amount:
//radix or counting sort because these are numbers that are of a fixed length

//#3 - Sport scores on ESPN
//Quick Sort

//#4 - Massive database (can't fit all into memory) needs to sort through past year's user data
//Merge Sort 

//#5 - Almost sorted Udemy review data needs to update and add 2 new reviews
//insertion sort

//#6 - Temperature Records for the past 50 years in Canada
//If they have no decimal places then you are probably going to use 
//radix or counting sort or if they do then probably Quick sort.

//#7 - Large user name database needs to be sorted. Data is very random.
//quicksort if memory is not an issue.

//#8 - You want to teach sorting for the first time
//bubble sort or selection sort