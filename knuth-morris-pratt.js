function computeLPSArray(pattern) {
    const lps = [0];
    let len = 0;
    let i = 1;

    while (i < pattern.length) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

function KMPSearch(text, pattern) {
    const n = text.length;
    const m = pattern.length;
    const lps = computeLPSArray(pattern);
    const matches = [];

    let i = 0; // index for text[]
    let j = 0; // index for pattern[]

    while (i < n) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }
        if (j === m) {
            matches.push(i - j);
            j = lps[j - 1];
        } else if (i < n && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    return matches;
}

const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";
const matches = KMPSearch(text, pattern);
console.log("Pattern", pattern, "found at indices:", matches);
