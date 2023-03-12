const TokenizerEn = require('./tokenizers/en')
const TokenizerZh = require('./tokenizers/zh')

class SearchEnginee {
    constructor({ tokenizer = new TokenizerEn(), k1 = 1.2, b = 0.75 }) {
        this.k1 = k1
        this.b = b
        this.avgdl = 0
        this.terms = {}
        this.documents = []
        this.totaldtl = 0
        this.tokenizer = tokenizer
    }

    reset() {
        this.avgdl = 0
        this.terms = {}
        this.documents = []
        this.totaldtl = 0
    }

    addDocument(document) {
        // Tokenize the document
        const tokens = this.tokenizer.tokenize(document)

        // Add the document to the list of documents
        const _document = {
            content: document,
            termLength: tokens.length,
        }
        this.documents.push(_document)

        // calculate average document length
        this.totaldtl += _document.termLength
        this.avgdl = this.totaldtl / this.documents.length

        // make dictionary
        const _terms = tokens.reduce((_terms, term) => {
            if (!_terms[term]) {
                _terms[term] = {
                    count: 0, // number of times this term appears in this document
                    freq: 0
                }
            }
            _terms[term].count++
            return _terms
        }, {})

        Object.keys(_terms).forEach(term => {
            // calculate term frequency for this document
            _terms[term].freq = _terms[term].count / _document.termLength

            // inverse document frequency initialization 
            if (!this.terms[term]) {
                this.terms[term] = {
                    count: 0, // number of documents containing this term
                    idf: 0,
                }
            }
            this.terms[term].count++
        })

        // update inverse document frequency
        Object.keys(this.terms).forEach(term => {
            this.terms[term].idf = Math.log((this.documents.length - this.terms[term].count + 0.5) / (this.terms[term].count + 0.5) + 1)
        })

        _document.terms = _terms

        return this
    }

    search(query) {
        const result = []

        const queryTokens = this.tokenizer.tokenize(query)

        this.documents.forEach(document => {

            document.score = 0

            queryTokens.forEach(term => {
                if (this.terms[term] && document.terms[term]) {
                    document.score += this.terms[term].idf * (document.terms[term].freq * (this.k1 + 1)) / (document.terms[term].freq + this.k1 * (1 - this.b + this.b * document.termLength / this.avgdl))
                }
            })

            if (!isNaN(document.score) && document.score > 0) {
                result.push(document)
            }
        })
        return result.sort((a, b) => b.score - a.score).splice(0, 10)
    }
}

module.exports = {
    SearchEnginee,
    TokenizerEn,
    TokenizerZh,
}