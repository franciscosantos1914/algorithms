function buildSuffixArray(text) {
    let suffixes = [];
    for (let i = 0; i < text.length; i++) {
        suffixes.push({ index: i, suffix: text.slice(i) });
    }

    suffixes.sort((a, b) => {
        if (a.suffix < b.suffix) return -1;
        if (a.suffix > b.suffix) return 1;
        return 0;
    });

    let suffixArray = [];
    for (let i = 0; i < suffixes.length; i++) {
        suffixArray.push(suffixes[i].index);
    }

    return suffixArray;
}

let text = "banana";
let suffixArray = buildSuffixArray(text);
console.log("Suffix Array of", text, ":", suffixArray);
