const memory = new Float64Array(1024);
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

exports.allocate = allocate;
exports.free = free;
exports.copy = copy;
exports.get = get;
exports.set = set;
