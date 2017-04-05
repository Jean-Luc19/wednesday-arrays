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
            throw new Error ('Memory Capacity Exceeded');
        }
        memory.copy(this.ptr, oldPtr, this.length);
        memory.free(oldPtr);
        this._capacity = size;
    }
    get(index){
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
        if(index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        if (this.length >=this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }
        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        memory.set(this.ptr + index, value);
        this.length++;
    }
}
Array.SIZE_RATIO = 3;

const arr = new Array();
for (var i=0; i< 5; i++){
    arr.push(Math.floor(Math.random()*100))
    // console.log (arr.get(i));
};



arr.pop();
console.log(arr);








//
// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
