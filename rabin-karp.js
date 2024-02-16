const prime = 101; // A prime number for hashing

function rabinKarp(text, pattern) {
    const n = text.length;
    const m = pattern.length;
    const patternHash = hash(pattern, m);
    const textHashes = [];

    // Compute initial hash for all substrings of length m in text
    for (let i = 0; i <= n - m; i++) {
        textHashes.push(hash(text.substring(i, i + m), m));
    }

    // Compare hash values and check for exact match
    for (let i = 0; i <= n - m; i++) {
        if (patternHash === textHashes[i] && pattern === text.substring(i, i + m)) {
            return i; // Pattern found at index i
        }
    }

    return -1; // Pattern not found
}

function hash(str, len) {
    let hashValue = 0;
    for (let i = 0; i < len; i++) {
        hashValue += str.charCodeAt(i) * Math.pow(prime, i);
    }
    return hashValue;
}

const text = "AABAACAADAABAABA";
const pattern = "AABA";
const index = rabinKarp(text, pattern);
if (index !== -1) {
    console.log("Pattern", pattern, "found at index:", index);
} else {
    console.log("Pattern", pattern, "not found in the text.");
}
