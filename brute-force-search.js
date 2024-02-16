function bruteForceSearch(text, pattern) {
    const matches = [];
    const n = text.length;
    const m = pattern.length;

    for (let i = 0; i <= n - m; i++) {
        let j;
        for (j = 0; j < m; j++) {
            if (text[i + j] !== pattern[j]) {
                break;
            }
        }
        if (j === m) {
            matches.push(i);
        }
    }

    return matches;
}

let text = "abracadabra";
let pattern = "abra";
let matches = bruteForceSearch(text, pattern);
console.log("Pattern", pattern, "found at indices:", matches);
