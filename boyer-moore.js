function preProcessBadCharacter(pattern) {
    const badChar = new Array(256).fill(-1); // Assuming ASCII characters

    for (let i = 0; i < pattern.length; i++) {
        badChar[pattern.charCodeAt(i)] = i;
    }

    return badChar;
}

function boyerMoore(text, pattern) {
    const n = text.length;
    const m = pattern.length;
    const badChar = preProcessBadCharacter(pattern);
    const matches = [];

    let shift = 0;

    while (shift <= n - m) {
        let j = m - 1;
        while (j >= 0 && pattern[j] === text[shift + j]) {
            j--;
        }

        if (j < 0) {
            matches.push(shift); // Pattern found at index 'shift'
            shift += (shift + m < n) ? m - badChar[text.charCodeAt(shift + m)] : 1;
        } else {
            shift += Math.max(1, j - badChar[text.charCodeAt(shift + j)]);
        }
    }

    return matches;
}

const text = "ABAAABCD";
const pattern = "ABC";
const matches = boyerMoore(text, pattern);
console.log("Pattern", pattern, "found at indices:", matches);
