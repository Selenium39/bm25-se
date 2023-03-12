const Koa = require('koa');
const Router = require('koa-router')
const {SearchEnginee,TokenizerZh} = require('../index')
const views = require('koa-views')
const path = require('path')



const router = new Router()
const app = new Koa();
const searchEnginee = new SearchEnginee({ tokenizer: new TokenizerZh() })

router.get('/add', async (ctx) => {
    const { document } = ctx.request.query
    searchEnginee.addDocument(document)
    await ctx.render('index', {
        results: []
    })
})

router.get('/search', async (ctx) => {
    const { query } = ctx.request.query
    const results = searchEnginee.search(query)
    await ctx.render('index', {
        results
    })
})

router.get('/', async (ctx) => {
    await ctx.render('index', {
        results: []
    })
})

router.get('/reset', async (ctx) => {
    searchEnginee.reset()
    await ctx.render('index', {
        results: []
    })
})

app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))
app.use(router.routes())

app.listen(3000)