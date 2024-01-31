function bucketSort(arr) {
    const n = arr.length;

    // Encontrar o valor máximo e mínimo no array
    let maxVal = Math.max(...arr);
    let minVal = Math.min(...arr);

    // Definir o tamanho do bucket e calcular o número de buckets
    const bucketSize = Math.floor((maxVal - minVal) / n) + 1;
    const bucketCount = Math.floor((maxVal - minVal) / bucketSize) + 1;

    // Inicializar os buckets
    const buckets = Array.from({ length: bucketCount }, () => []);

    // Distribuir os elementos nos buckets
    for (let i = 0; i < n; i++) {
        const bucketIndex = Math.floor((arr[i] - minVal) / bucketSize);
        buckets[bucketIndex].push(arr[i]);
    }

    // Ordenar individualmente os elementos dentro de cada bucket
    for (let i = 0; i < bucketCount; i++) {
        buckets[i].sort((a, b) => a - b);
    }

    // Concatenar os buckets ordenados para obter o array ordenado final
    const sortedArray = [].concat(...buckets);

    return sortedArray;
}

const unsortedArray = [38, 27, 43, 3, 9, 82, 10];
const sortedArray = bucketSort(unsortedArray);

console.log("Array não ordenado:", unsortedArray);
console.log("Array ordenado:", sortedArray);
