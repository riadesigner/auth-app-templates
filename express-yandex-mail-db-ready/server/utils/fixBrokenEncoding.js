
// module.exports.fixBrokenEncoding = (brokenName)=>{
//     try {
//         // Для имен вроде "R11001_ÑÑ_Ð»Ð¸ÑÐ¾_1.pdf"
//         const latin1Bytes = new Uint8Array(brokenName.length);
//         for (let i = 0; i < brokenName.length; i++) {
//             latin1Bytes[i] = brokenName.charCodeAt(i);
//         }
//         return new TextDecoder('windows-1251').decode(latin1Bytes);
//     } catch (e) {
//         return brokenName;
//     }
// }


module.exports.detectAndFixEncoding = (brokenName)=>{
    const encodings = ['windows-1251', 'iso-8859-1', 'utf8'];
    
    for (const encoding of encodings) {
        try {
            const fixed = Buffer.from(brokenName, 'binary').toString(encoding);
            // Проверяем, стало ли лучше (меньше мусорных символов)
            if (!fixed.includes('Ñ') && !fixed.includes('Ð')) {
                return fixed;
            }
        } catch (e) {
            continue;
        }
    }
    return brokenName;
}