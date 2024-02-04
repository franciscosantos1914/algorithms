function linearSearch(array, target) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === target) return i;
    }
    return -1;
}

console.log(linearSearch([1, 3, 5, 7, 9, 11], 5))


