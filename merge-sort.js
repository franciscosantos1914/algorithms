function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr; // O array já está ordenado se tiver 0 ou 1 elemento
    }

    // Divide o array ao meio
    const middle = Math.floor(arr.length / 2);
    const leftHalf = arr.slice(0, middle);
    const rightHalf = arr.slice(middle);

    // Recursivamente ordena as duas metades
    const leftSorted = mergeSort(leftHalf);
    const rightSorted = mergeSort(rightHalf);

    // Mescla as duas metades ordenadas
    return merge(leftSorted, rightSorted);
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Comparando e mesclando as duas metades
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Adiciona os elementos restantes (se houver) de ambas as metades
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

const unsortedArray = [38, 27, 43, 3, 9, 82, 10];
const sortedArray = mergeSort(unsortedArray);

console.log("Array não ordenado:", unsortedArray);
console.log("Array ordenado:", sortedArray);
