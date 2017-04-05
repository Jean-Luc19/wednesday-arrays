const memory = new Float64Array(1024*3);
const head = 0;

const allocate = function(size) {
    if (head + size > memory.length) {
        return null;
    }
    let start = head;
    head += size;
    return start;
};

const free = function(ptr) {
};

const copy = function(to, from, size) {
    if (from === to) {
        return;
    }
    else if (from > to) {
        // Iterate forwards
        for (let i=0; i<size; i++) {
            set(to + i, get(from + i));
        }
    }
    else {
        // Iterate backwards
        for (let i=size - 1; i>=0; i--) {
            set(to + i, get(from + i));
        }
    }
};

const get = function(ptr) {
    return memory[ptr];
};

const set = function(ptr, value) {
    memory[ptr] = value;
};

/* array with 5 elements we want to remove item and index 1, this.ptr is 0
memory.copy(to=1, from=2, size=3)
else if (from > to) {
    // Iterate forwards
    for (let i=0; i<3; i++) {
        set(1 + i, get(2 + i));
    } >>> set(1, 2)
}


*/

exports.allocate = allocate;
exports.free = free;
exports.copy = copy;
exports.get = get;
exports.set = set;
