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


///////  End Constructor   //////////////////////////////

// Define Arrays
const mergedArr = new Array();

const arr1 = new Array();
for (let i = 0; i < 20; i++) {
    arr1.push(i);
}

const arr2 = new Array();
for (let i = 0; i < 40; i += 2) {
    arr2.push(i);
}

const arr3 = new Array();
arr3.push(1)
arr3.push(3)
arr3.push(5)
arr3.push(2)

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

const prodArr = new Array();

const productOfIndecies = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let product = 1;
        let iCurrentVal = arr.get(i)
        for (let j = 0; j < arr.length; j++) {
            let jCurrentVal = arr.get(j)
            if (jCurrentVal !== iCurrentVal) {
                console.log(`iCurrentVal = ${iCurrentVal}`)
                product *= jCurrentVal;
                console.log(product)
            }
            console.log((`jCurrentVal = ${jCurrentVal}`))
        }
        prodArr.push(product)
    }
    return prodArr;
}

productOfIndecies(arr3);
console.log(prodArr)

for (let i = 0; i < 5; i++) {
    console.log(prodArr.get(i))
}
