function heapSort(array) {
    const arr = structuredClone(array)
    // Constrói uma max-heap a partir do array
    buildMaxHeap(arr);

    // Extrai elementos da heap um por um, movendo o maior elemento para o final
    for (let i = arr.length - 1; i > 0; i--) {
        // Troca o elemento raiz (maior) com o último elemento não ordenado
        [arr[0], arr[i]] = [arr[i], arr[0]];

        // Restaura a propriedade de max-heap na parte não ordenada do array
        heapify(arr, i, 0);
    }

    return arr;
}

function buildMaxHeap(arr) {
    const n = arr.length;

    // Constrói uma max-heap começando do último nó não folha até a raiz
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
}

function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // Encontra o maior entre o nó atual, o filho esquerdo e o filho direito
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // Se o maior não for o nó atual, troca os elementos e chama heapify recursivamente
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

const unsortedArray = [38, 27, 43, 3, 9, 82, 10];
const sortedArray = heapSort(unsortedArray);

console.log("Array não ordenado:", unsortedArray);
console.log("Array ordenado:", sortedArray);
