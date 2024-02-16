function slidingWindow(arr, k) {
    if (arr.length < k) {
        return [];
    }

    let windowSum = 0;
    let maxSum = 0;
    let maxSumIndices = [];

    // Compute sum of the first window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }

    maxSum = windowSum;

    // Slide the window by one element at a time
    for (let i = k; i < arr.length; i++) {
        // Add the next element to the window and subtract the first element of the previous window
        windowSum += arr[i] - arr[i - k];

        // Update maxSum if needed
        if (windowSum > maxSum) {
            maxSum = windowSum;
            maxSumIndices = [i - k + 1, i]; // Store indices of the current maximum sum window
        }
    }

    return maxSumIndices;
}

const arr = [4, 2, 1, 7, 8, 1, 2, 8, 1, 0];
const k = 3;
const maxSumIndices = slidingWindow(arr, k);
console.log("Indices of the maximum sum subarray of length", k, ":", maxSumIndices);
