function insertionSort(array) {
    const n = array.length;
    const arr = structuredClone(array)

    for (let i = 1; i < n; i++) {
        // Armazena o elemento atual que será movido para a posição correta
        const currentElement = arr[i];

        // Inicializa o índice do elemento anterior ao elemento atual
        let j = i - 1;

        // Move os elementos maiores que o atual para a direita
        while (j >= 0 && arr[j] > currentElement) {
            arr[j + 1] = arr[j];
            j--;
        }

        // Insere o elemento atual na posição correta
        arr[j + 1] = currentElement;
    }

    return arr;
}

const unsortedArray = [38, 27, 43, 3, 9, 82, 10];
const sortedArray = insertionSort(unsortedArray);

console.log("Array não ordenado:", unsortedArray);
console.log("Array ordenado:", sortedArray);
