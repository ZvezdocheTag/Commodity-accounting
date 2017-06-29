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

if (process.env.NODE_ENV === 'production') {
  app.use(serve('client/build'));
}
app.use(serve('client/build'));
app.use(bodyParser());

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
.post('/person',async function (ctx) {
    const good = ctx.request.body;
    const goodItem = good.goods[0];

    if(!goodItem.name || !good.category || !goodItem.price || !goodItem.retail || !goodItem.id) {
        // TODO error handl
        ctx.render('show_message', {message: "Sorry, you provided wrong info", type: "error"});
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

        await newGood.save((err, res) => {
            if(err) {
                // TODO error handl
                 ctx.render('show_message', {message: "Database error", type: "error"});
            } else {
                ctx.response.body = res;
            }
        })
    }
})
.put('/person', async function(ctx) {
    let good = ctx.request.body;
    if(!good.name || !good.category || !good.price || !good.retail ||  !good.id) {
        console.log("ERR PUT")
        ctx.render('show_message', {message: "Sorry, you provided wrong info", type: "error"});
    } else {
        await Good.findOneAndUpdate({_id: good._id},{ 
            category: good.category,
            goods: [{            
                name: good.name,
                price: good.price,
                retail: good.retail,
                id: good.id
            }]
        } ,{}, (err, res) => {
                console.log(res)
                ctx.response.body = {res};
        })
    }
})
.delete('/person/', async function(ctx) {
    await Good.findById(ctx.request.body.id).remove((err, ok) => {
        if(err) {
            console.log(err)
        } else {
            ctx.response.body = "ok";
        }
    })

})
.get('/data',   async function(ctx) {

    await Good.find({}, function(err, teams) {
        if (err) {
            console.log(err)
        } else {
            // console.log(teams, "DATA GOOD")
            ctx.body = teams
        }
    }); 
 
})

router.get('/category', async function(ctx) {
     const category = ctx.request.body;

    await Category.find({}, function(err, category) {
        if (err) {
            console.log(err)
        } else {
            // console.log(category, "DATA CATEGORY")
            ctx.body = category
        }
    }); 
})
.post('/category', async function(ctx) {
    const category = ctx.request.body;

    // console.log(category)
    if(!category.categoryName) {
        // TODO error handl
        ctx.render('show_message', {message: "Sorry, you provided wrong info", type: "error"});
    } else {
        let newCategory = new Category({
            categoryName: category.categoryName
        })

        await newCategory.save((err, res) => {
            if(err) {
                // TODO error handl
                 ctx.render('show_message', {message: "Database error", type: "error"});
            } else {
                
                ctx.response.body = res;
            }
        })
    }
})
.delete('/category', async function(ctx) {
    console.log(ctx.request.body.id)
    await Category.findById(ctx.request.body.id).remove((err, ok) => {
        if(err) {
            console.log(err)
        } else {
            ctx.response.body = "ok";
        }
    })

})

app.use(router.routes());
app.listen(3003);