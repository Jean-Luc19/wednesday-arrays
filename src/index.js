import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import memory from './components/memory';


class Array {
    constructor() {
        this.length = 0;
        this._capacity = 0;
        this.ptr = memory.allocate(this.length)
    }
    push(value) {
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }
        memory.set(this.ptr + this.length, value);
        this.length++;
    }
    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = memory.allocate(size);

        if (this.ptr === null) {
            throw new Error(`Memory Capacity Exceeded WTF? ${oldPtr}`);
        }
        memory.copy(this.ptr, oldPtr, this.length);
        memory.free(oldPtr);
        this._capacity = size;
    }
    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        return memory.get(this.ptr + index);
    }
    pop() {
        if (this.length == 0) {
            throw new Error('Index error');
        }
        const value = memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }
    insert(index, value) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }
        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        memory.set(this.ptr + index, value);
        this.length++;
    }
    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        this.length--;
    }


}
Array.SIZE_RATIO = 3;

const arr = new Array();

for (let i = 1; i <= 5; i++) {
    arr.push(i)
};

const product = x => {
    let current1 = 0;
    let current2 = 0;


    let arrNew = new Array();

    for (let i = 0; i < x.length; i++) {
        current1 = x.get(i)
        var currentProduct = 1;
        for (let j = 0; j < x.length; j++) {


            current2 = x.get(j)

            if (current1 !== current2) {
                currentProduct = current2 * currentProduct
            }
        }

        arrNew.push(currentProduct)
    }
    return arrNew;
}
let arr3 = product(arr);





// Define Arrays
const mergedArr = new Array();



const arr2 = new Array();
for (let i = 0; i < 40; i += 2) {
    arr2.push(i);
}



const arr4 = new Array();
for (let i = 0; i < 10; i++) {
    arr4.push(i);
}

const arr5 = new Array();
for (let i = 0; i < 30; i += 2) {
    arr5.push(i);
}


///  Filter Array

// filter(x => x % 2 === 0, arr1); // function to filter by
//
// function filter(fn, arr1) {
//     for (let i = arr1.length - 1; i >= 0 ; i--) {  // here's the trick!! go backwards!
//         let currentValue = arr1.get(i)
//
//         if (fn(currentValue)) {
//             arr1.remove(i);
//         }
//         else{
//             console.log(`Didn't get filtered: ${arr1.get(i)}`)
//         }
//     }
//     return arr1;
// }
//

///  Merge Two Ordered Arrays

// filter(x => x % 2 === 0, arr)
// function filter(fn, arr) {
//     for (let i = arr.length - 1; i >= 0 ; i--) {
//         let currentValue = arr.get(i)
//
//         if (fn(currentValue)) {
//             arr.remove(i);
//         }
//         else{
//             console.log(`Didn't get filtered: ${arr.get(i)}`)
//         }
//     }
//     return arr;
//
// }





// const len = arr4.length < arr5.length ? arr5.length : arr4.length;

//
// const mergeTwo = (arr4, arr5) => {
//     for (let i = 0; i < len; i++) {
//         let currentArr1 = arr4.get(i)
//         let currentArr2 = arr5.get(i)
//
//         if (currentArr1 < currentArr2) {
//             mergedArr.push(currentArr1)
//         } else {
//             mergedArr.push(currentArr2)
//         }
//     }
//     return mergedArr;
// }
// mergeTwo(arr4, arr5);



///  Find the products of every number in the array, except the one at that index.
