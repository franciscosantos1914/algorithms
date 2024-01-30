function quickSort(arr) {
    if (arr.length <= 1) {
        return arr; // O array já está ordenado se tiver 0 ou 1 elemento
    }

    // Escolhe um elemento como pivô (pode ser o elemento do meio, por exemplo)
    const pivot = arr[Math.floor(arr.length / 2)];

    // Divide o array em dois subarrays: elementos menores que o pivô e elementos maiores que o pivô
    const left = arr.filter(element => element < pivot);
    const equal = arr.filter(element => element === pivot);
    const right = arr.filter(element => element > pivot);

    // Recursivamente ordena os subarrays menores e combina-os com os elementos iguais ao pivô
    return quickSort(left).concat(equal, quickSort(right));
}

const unsortedArray = [38, 27, 43, 3, 9, 82, 10];
const sortedArray = quickSort(unsortedArray);

console.log("Array não ordenado:", unsortedArray);
console.log("Array ordenado:", sortedArray);
