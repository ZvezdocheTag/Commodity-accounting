const Koa = require('koa');
var Pug = require('koa-pug');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
const app = new Koa();
var pug = new Pug({
  viewPath: './views',
  basedir: './views',
  app: app 
});
app.use(bodyParser());
const router = new Router();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db');

const Schema = mongoose.Schema;
const schemaGood = new Schema({
    category: String,
    name: String,
    price: Number,
    retailPrice: Number
})

const Good = mongoose.model('Good', schemaGood)


router.get('/', (ctx) => {
    ctx.render('few')
}).post('/person',async function (ctx) {
    const good = ctx.request.body;
    if(!good.name || !good.category || !good.price || !good.retail) {
        console.log("GE")
        ctx.render('show_message', {message: "Sorry, you provided wrong info", type: "error"});
    } else {
        
        let newGood = new Good({
            category: good.category,
            name: good.name,
            price: good.price,
            retailPrice: good.retail
        })
        console.log(newGood)
        await newGood.save((err, res) => {
            if(err) {
                console.log(err)
                 ctx.render('show_message', {message: "Database error", type: "error"});
            } else {
                console.log("Good")
                ctx.render('show_message', {message: "New person added again", type: "success", good: good});
            }
        })
    }
    // console.log()
    // ctx.body = "Page are created"
})

router.get('/data',  function(ctx) {
   
})

app.use(router.routes());
app.listen(3003);