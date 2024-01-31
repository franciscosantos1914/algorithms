function countingSort(arr) {
    const n = arr.length;

    // Encontrar o valor máximo no array
    const maxVal = Math.max(...arr);

    // Inicializar um array de contagem e um array de saída
    const countArray = Array(maxVal + 1).fill(0);
    const outputArray = Array(n);

    // Contar a frequência de cada elemento
    for (let i = 0; i < n; i++) {
        countArray[arr[i]]++;
    }

    // Atualizar o array de contagem para ter as posições corretas
    for (let i = 1; i <= maxVal; i++) {
        countArray[i] += countArray[i - 1];
    }

    // Construir o array de saída
    for (let i = n - 1; i >= 0; i--) {
        outputArray[countArray[arr[i]] - 1] = arr[i];
        countArray[arr[i]]--;
    }

    return outputArray;
}

const unsortedArray = [4, 2, 7, 1, 5, 3, 6];
const sortedArray = countingSort(unsortedArray);

console.log("Array não ordenado:", unsortedArray);
console.log("Array ordenado:", sortedArray);
