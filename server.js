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
    if(!good.goods[0].name || !good.category || !good.goods[0].price || !good.goods[0].retail) {
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

        await newGood.save((err, res) => {
            if(err) {
                 ctx.render('show_message', {message: "Database error", type: "error"});
            } else {
                ctx.response.body = res;
            }
        })
    }
})
.put('/person', async function(ctx) {
    let good = ctx.request.body;

    console.log(good)
    if(!good.name || !good.category || !good.price || !good.retail) {
        ctx.render('show_message', {message: "Sorry, you provided wrong info", type: "error"});
    } else {
            console.log(good)
        // let newGood = new Good({
        //     category: good.category,
        //     goods: [{            
        //         name: good.goods[0].name,
        //         price: good.goods[0].price,
        //         retailPrice: good.goods[0].retail
        //     }]
        // })

        await Good.findOneAndUpdate({_id: good._id},{ 
            category: good.category,
            goods: [{            
                name: good.name,
                price: good.price,
                retailPrice: good.retail
            }]
        } ,{}, (err, res) => {
   
                console.log(res, "GOOD")
                ctx.response.body = res;
            
        })
    }
})
.delete('/person/', async function(ctx) {
    await Good.findById(ctx.request.body.id).remove((err, ok) => {
        if(err) {
            console.log(err)
        } else {
            // console.log(ctx.request.body.id)
            ctx.response.body = "ok";
        }
    })

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

// Good.remove({}, function(err) {console.log(err)})


app.use(router.routes());
app.listen(3003);