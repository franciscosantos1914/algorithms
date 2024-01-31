// Encontra o dígito em uma posição específica
function getDigit(num, place) {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

// Encontra o número máximo de dígitos em um array
function getMaxDigits(arr) {
    let maxDigits = 0;
    for (let i = 0; i < arr.length; i++) {
        maxDigits = Math.max(maxDigits, Math.floor(Math.log10(Math.abs(arr[i])) + 1));
    }
    return maxDigits;
}

// Implementação principal do Radix Sort
function radixSort(array) {
    let arr = structuredClone(array)
    const maxDigits = getMaxDigits(arr);

    for (let i = 0; i < maxDigits; i++) {
        // Cria baldes para cada dígito (0 a 9)
        const buckets = Array.from({ length: 10 }, () => []);

        // Distribui os elementos nos baldes com base no dígito atual
        for (let j = 0; j < arr.length; j++) {
            const digit = getDigit(arr[j], i);
            buckets[digit].push(arr[j]);
        }

        // Concatena os baldes para formar um novo array
        arr = [].concat(...buckets);
    }

    return arr;
}

const unsortedArray = [170, 45, 75, 90, 802, 24, 2, 66];
const sortedArray = radixSort(unsortedArray);

console.log("Array não ordenado:", unsortedArray);
console.log("Array ordenado:", sortedArray);
