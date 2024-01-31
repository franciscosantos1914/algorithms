function bubbleSort(array) {
    const n = array.length;
    const arr = structuredClone(array)

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }

    return arr;
}

const unsortedArray = [38, 27, 43, 3, 9, 82, 10];
const sortedArray = bubbleSort(unsortedArray);

console.log("Array não ordenado:", unsortedArray);
console.log("Array ordenado:", sortedArray);
