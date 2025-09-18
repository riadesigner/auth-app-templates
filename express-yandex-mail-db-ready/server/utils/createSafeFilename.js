const { transliterate } = require('transliteration');

module.exports.createSafeFilename = (filename) => {
    const extension = filename.includes('.') 
        ? filename.substring(filename.lastIndexOf('.')).toLowerCase()
        : '';
        
    const name = filename.includes('.')
        ? filename.substring(0, filename.lastIndexOf('.'))
        : filename;
        
    return transliterate(name)
        .replace(/[^a-zA-Z0-9]/g, '_')
        .replace(/_{2,}/g, '_')
        .replace(/^_+|_+$/g, '')
        + extension;
}