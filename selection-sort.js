function selectionSort(array) {
    const n = array.length;
    const arr = structuredClone(array)

    for (let i = 0; i < n - 1; i++) {
        // Encontra o índice do menor elemento na parte não ordenada
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // Troca o menor elemento encontrado com o primeiro elemento não ordenado
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }

    return arr;
}

const unsortedArray = [38, 27, 43, 3, 9, 82, 10];
const sortedArray = selectionSort(unsortedArray);

console.log("Array não ordenado:", unsortedArray);
console.log("Array ordenado:", sortedArray);
