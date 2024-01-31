function shellSort(array) {
    const n = array.length;
    const arr = structuredClone(array)

    // Inicializa o intervalo h usando a sequência de intervalos de Shell
    let h = 1;
    while (h < n / 3) {
        h = 3 * h + 1; // Sequência de intervalos de Shell: 1, 4, 13, 40, 121, ...
    }

    // Começa com o maior intervalo e reduz gradualmente
    while (h >= 1) {
        // Aplica o algoritmo de ordenação por inserção com o intervalo h
        for (let i = h; i < n; i++) {
            for (let j = i; j >= h && arr[j] < arr[j - h]; j -= h) {
                // Troca elementos
                [arr[j], arr[j - h]] = [arr[j - h], arr[j]];
            }
        }

        // Reduz o intervalo
        h = Math.floor(h / 3);
    }

    return arr;
}


const unsortedArray = [38, 27, 43, 3, 9, 82, 10];
const sortedArray = shellSort(unsortedArray);

console.log("Array não ordenado:", unsortedArray);
console.log("Array ordenado:", sortedArray);
