class TokenizerEn {
    tokenize(document) {
        return document
            .toLowerCase()
            .replace(/\W/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .split(' ')
    }
}

module.exports = TokenizerEn