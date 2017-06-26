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
    goods: [{name: String,
    price: Number,
    retailPrice: Number}]
})

const Good = mongoose.model('Good', schemaGood)


router.get('/sew', (ctx) => {
    ctx.render('few')
}).post('/person',async function (ctx) {
    const good = ctx.request.body;
    console.log(good.goods[0])
    if(!good.goods[0].name || !good.category || !good.goods[0].price || !good.goods[0].retail) {
        console.log("GE")
        ctx.render('show_message', {message: "Sorry, you provided wrong info", type: "error"});
    } else {
        
        let newGood = new Good({
            category: good.category,
            goods: [{            
                name: good.goods[0].name,
                price: good.goods[0].price,
                retailPrice: good.goods[0].retail
            }]
        })

        console.log(newGood)
        await newGood.save((err, res) => {
            if(err) {
                console.log(err)
                 ctx.render('show_message', {message: "Database error", type: "error"});
            } else {
                console.log("Good")
                console.log(ctx)
                // ctx.render('show_message', {message: "New person added again", type: "success", good: good});
                ctx.response.body = res;
            }
        })
    }
    // console.log()
    // ctx.body = "Page are created"
})



router.get('/data',   async function(ctx) {
   let database = [];
   
    await Good.find({}, function(err, teams) {
    if (err) {
      console.log(err)
    } else {
        ctx.body = teams
        // console.log(ctx.response.body)
    }
  }); 


})


app.use(router.routes());
app.listen(3003);