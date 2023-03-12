const Segment = require('segment');
const segment = new Segment();
segment.useDefault();

class TokenizerZh {
    tokenize(document) {
        return segment.doSegment(document, {
            simple: true,
            stripPunctuation: true
        })
    }
}

module.exports = TokenizerZh