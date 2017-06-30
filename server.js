const Koa = require('koa');
var Pug = require('koa-pug');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
var serve = require('koa-static');

const app = new Koa();
const router = new Router();
var pug = new Pug({
  viewPath: './views',
  basedir: './views',
  app: app 
});

if(typeof process.env.NODE_ENV !== "undefined") {
    if (process.env.NODE_ENV === 'production') {
    app.use(serve('client/build'));
    }
}

app.use(bodyParser());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:123456@ds143542.mlab.com:43542/test-commodity');
const Schema = mongoose.Schema;
const schemaGood = new Schema({
        category: String,
        goods: [{name: String,
        price: Number,
        retail: Number,
        id: Number
    }]
})

const schemaCategory = new Schema({
        categoryName: String,
})

const Good = mongoose.model('Good', schemaGood)
const Category = mongoose.model('Category', schemaCategory)

router.get('/sew', (ctx) => {
    ctx.render('few')
})
.post('/person',async function (ctx, next) {
    const good = ctx.request.body;
    let goodItem;

    try {
       goodItem = good.goods[0] 
    } catch(err) {
        throw err;
    }

    if(!goodItem.name || !good.category || !goodItem.price || !goodItem.retail || !goodItem.id) {
        // TODO error handl
        console.log(err, "ERR")
        throw err;
    } else {
        let newGood = new Good({
            category: good.category,
            goods: [{            
                name: goodItem.name,
                price: goodItem.price,
                retail: goodItem.retail,
                id: goodItem.id
            }]
        })

        await newGood.save().then(res => ctx.response.body = res),err => console.log(err)
    }
})
.put('/person', async function(ctx) {
    let good = ctx.request.body;
    // console.log(ctx)
    if(!good.name || !good.category || !good.price || !good.retail ||  !good.id) {
        // ctx.render('show_message', {message: "Sorry, you provided wrong info", type: "error"});
    } else {
        // console.log(good, "REEE CANGE")
        let id = {_id: good._id};
        let data = { 
            category: good.category,
            goods: [{            
                name: good.name,
                price: good.price,
                retail: good.retail,
                id: good.id
            }]
        }

        await Good.update(id, { $set: data}, function(err, res) {
            if(err) {
                console.log(err)
            } else {
                ctx.response.body = res
            }
        })

    }
})
.delete('/person/', async function(ctx) {

    await Good.findById(ctx.request.body.id).remove().then(res => ctx.response.body = res, err => console.log(err))

})
.get('/data',   async function(ctx) {

    await Good.find({})
            .then((res) =>
             ctx.response.body = res,
                err => console.log(err, "ERR")); 
 
})


router.get('/category', async function(ctx, next) {
     const category = ctx.request.body;

    await Category.find({}).then(res => {
        ctx.response.body = res;
    }, 
    err => {
        console.log(err, "CATEGORY")
    }) 
})
.post('/category', async function(ctx) {
    const category = ctx.request.body;

    if(!category.categoryName) {
        // TODO error handl
        ctx.render('show_message', {message: "Sorry, you provided wrong info", type: "error"});
    } else {
        let newCategory = new Category({
            categoryName: category.categoryName
        })

        await newCategory.save().then(res => ctx.response.body = res, err => console.log(err))
    }
})
.delete('/category', async function(ctx) {
    await Category.findById(ctx.request.body.id).remove().then(res => ctx.response.body = res, err => console.log(err))

})

app.use(router.routes());
app.listen(process.env.PORT || 3003);