class HuffmanNode {
    constructor(char, freq) {
        this.char = char;
        this.freq = freq;
        this.left = null;
        this.right = null;
    }
}

function buildHuffmanTree(frequencies) {
    const nodes = frequencies.map(([char, freq]) => new HuffmanNode(char, freq));

    while (nodes.length > 1) {
        nodes.sort((a, b) => a.freq - b.freq);

        const left = nodes.shift();
        const right = nodes.shift();

        const newNode = new HuffmanNode(null, left.freq + right.freq);
        newNode.left = left;
        newNode.right = right;

        nodes.push(newNode);
    }

    return nodes[0];
}

function generateHuffmanCodes(root, currentCode = "", codes = {}) {
    if (root) {
        if (root.char !== null) {
            codes[root.char] = currentCode;
        }

        generateHuffmanCodes(root.left, currentCode + "0", codes);
        generateHuffmanCodes(root.right, currentCode + "1", codes);
    }

    return codes;
}

function compress(text) {
    const charFrequencies = Array.from(text).reduce((freqs, char) => {
        freqs[char] = (freqs[char] || 0) + 1;
        return freqs;
    }, {});

    const huffmanTree = buildHuffmanTree(Object.entries(charFrequencies));
    const huffmanCodes = generateHuffmanCodes(huffmanTree);

    const compressedText = Array.from(text)
        .map((char) => huffmanCodes[char])
        .join("");

    return {
        huffmanTree,
        huffmanCodes,
        compressedText,
    };
}

function decompress(compressedText, huffmanTree) {
    let currentNode = huffmanTree;
    let decompressedText = "";

    for (const bit of compressedText) {
        currentNode = bit === "0" ? currentNode.left : currentNode.right;

        if (currentNode.char !== null) {
            decompressedText += currentNode.char;
            currentNode = huffmanTree;
        }
    }

    return decompressedText;
}


const inputText = "abracadabra";
const { huffmanTree, huffmanCodes, compressedText } = compress(inputText);

console.log("Original Text:", inputText);
console.log("Huffman Tree:", huffmanTree);
console.log("Huffman Codes:", huffmanCodes);
console.log("Compressed Text:", compressedText);

const decompressedText = decompress(compressedText, huffmanTree);
console.log("Decompressed Text:", decompressedText);
