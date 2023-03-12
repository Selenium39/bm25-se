# bm25-se
This is a simple search engine implementation that can index and search documents based on the input query. The search engine uses a scoring algorithm based on the BM25 ranking function.

### Installation

To use this search engine, you need to have Node.js installed on your machine. You can clone this repository and run npm install to install any dependencies required.
```js
npm i bm25-se
```

### Usage

```js
const { SearchEnginee, TokenizerEn } = require('bm25-se')

// create a new search engine instance
const searchEngine = new SearchEnginee({ tokenizer: new TokenizerEn() })

// add documents to the index
searchEngine.addDocument("this is an example document")
searchEngine.addDocument("this is another document")
searchEngine.addDocument("yet document")

// search for documents that contain the word "example"
const searchResults = searchEngine.search("example document")

console.log(searchResults) // should output a list of documents that match the query, ordered by relevance
```
![searchResults](https://user-images.githubusercontent.com/29670394/224546087-9ddfd623-e08d-4fb9-be13-0bf859a3e84e.png)

### Demo
You can try out the search engine in your browser by running the following command:
```js
git clone https://github.com/Selenium39/bm25-se.git 
cd bm25-se
npm install
npm run web
```
Then open http://localhost:3000 in your browser.

![demo](https://user-images.githubusercontent.com/29670394/224546359-77678184-4d32-4b93-9aa0-02de992f1ba4.png)

### API

#### SearchEnginee(options)
Creates a new instance of the search engine.

- options (optional): An object with the following properties:
    - tokenizer (optional): A tokenizer object to use for tokenizing the documents. Defaults to new TokenizerEn().
    - k1 (optional): A parameter for the BM25 scoring function. Defaults to 1.2.
    - b (optional): A parameter for the BM25 scoring function. Defaults to 0.75.
#### reset()
Resets the search engine, removing all indexed documents and terms.

#### addDocument(document)
Indexes a new document in the search engine.
- document: A string representing the content of the document to index.

#### search(query)
Searches the indexed documents for the given query string and returns a list of matching documents.
- query: A string representing the search query.

#### TokenizerEn
A tokenizer object for tokenizing English text.

#### TokenizerZh
A tokenizer object for tokenizing Chinese text.

### Contributing
If you find any bugs or have any suggestions, feel free to open an issue or a pull request.

### References
- [Okapi BM25](https://en.wikipedia.org/wiki/Okapi_BM25)
- [machine-learning-full-text-search-in-javascript-relevance-scoring](https://burakkanber.com/blog/machine-learning-full-text-search-in-javascript-relevance-scoring/)

### License
MIT License