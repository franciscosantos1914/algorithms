function cubeSort(arr) {
    const n = arr.length;

    // Divide o array em cubos (baldes)
    const cubes = [];
    for (let i = 0; i < n; i++) {
        if (!cubes[arr[i]]) {
            cubes[arr[i]] = [];
        }
        cubes[arr[i]].push(arr[i]);
    }

    // Concatena os cubos ordenados para obter o array ordenado final
    const sortedArray = [];
    for (let i = 0; i < cubes.length; i++) {
        if (cubes[i]) {
            cubes[i].sort((a, b) => a - b);
            sortedArray.push(...cubes[i]);
        }
    }

    return sortedArray;
}

const unsortedArray = [4, 2, 7, 1, 5, 3, 6];
const sortedArray = cubeSort(unsortedArray);

console.log("Array não ordenado:", unsortedArray);
console.log("Array ordenado:", sortedArray);
