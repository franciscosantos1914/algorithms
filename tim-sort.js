const MIN_MERGE = 32;

function insertionSort(arr, left, right) {
    for (let i = left + 1; i <= right; i++) {
        const key = arr[i];
        let j = i - 1;

        while (j >= left && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
    }
}

function merge(arr, left, mid, right) {
    const len1 = mid - left + 1;
    const len2 = right - mid;

    const leftArr = new Array(len1);
    const rightArr = new Array(len2);

    for (let i = 0; i < len1; i++) {
        leftArr[i] = arr[left + i];
    }
    for (let j = 0; j < len2; j++) {
        rightArr[j] = arr[mid + 1 + j];
    }

    let i = 0, j = 0, k = left;

    while (i < len1 && j < len2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }

    while (i < len1) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }

    while (j < len2) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
}

function timSort(array) {
    const n = array.length;
    const arr = structuredClone(array)

    for (let i = 0; i < n; i += MIN_MERGE) {
        insertionSort(arr, i, Math.min((i + MIN_MERGE - 1), (n - 1)));
    }

    for (let size = MIN_MERGE; size < n; size = 2 * size) {
        for (let left = 0; left < n; left += 2 * size) {
            const mid = left + size - 1;
            const right = Math.min((left + 2 * size - 1), (n - 1));

            if (mid < right) {
                merge(arr, left, mid, right);
            }
        }
    }

    return arr;
}


const unsortedArray = [38, 27, 43, 3, 9, 82, 10];
const sortedArray = timSort(unsortedArray);

console.log("Array não ordenado:", unsortedArray);
console.log("Array ordenado:", sortedArray);
