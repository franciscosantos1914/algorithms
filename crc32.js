function generateCRC32(str) {
    const crc32Table = (function () {
        let table = new Uint32Array(256);

        for (let i = 0; i < 256; i++) {
            let crc = i;
            for (let j = 0; j < 8; j++) {
                crc = (crc & 1 ? 0xEDB88320 : 0) ^ (crc >>> 1);
            }
            table[i] = crc >>> 0;
        }

        return table;
    })();

    let crc = 0xFFFFFFFF;

    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i) & 0xFF;
        crc = (crc >>> 8) ^ crc32Table[(crc ^ charCode) & 0xFF];
    }

    return (crc ^ 0xFFFFFFFF) >>> 0;
}

const inputString = "Hello, CRC32!";
const crc32Value = generateCRC32(inputString);
console.log("CRC32 Value:", crc32Value.toString(16));
