const express = require('express');
const app = express();
const path = require('path');
const product = require('./modules/Product');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

//const { render } = require('ejs');
mongoose.connect('mongodb://localhost:27017/farms')
    .then(() => {
        console.log("mongo connected successfully");
    }).catch(err => {
        console.log("mongo Erro");
        console.log(err);
    });
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetable', 'dairy'];

app.get('/producting', async (req, res) => {
    const products = await product.find({});
    console.log(products);
    res.render('producting/index', { products });
});
app.get('/producting/new', (req, res) => {
    res.render('producting/new', { categories });
})
app.post('/producting', async (req, res) => {
    const newProduct = new product(req.body);
    await newProduct.save();
    res.redirect(`/producting/${newProduct._id}`);
})
app.get('/producting/:id', async (req, res) => {
    const { id } = req.params;
    const products = await product.findById(id);
    res.render('producting/show', { products });
});
app.get('/producting/:id/edit', async (req, res) => {
    const { id } = req.params;
    const products = await product.findById(id);
    res.render('producting/edit', { products, categories });
});
app.put('/producting/:id', async (req, res) => {
    const { id } = req.params;
    const products = await product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/producting/${products._id}`);
});
app.delete('/producting/:id', async (req, res) => {
    const { id } = req.params;
    const delectedProduct = await product.findByIdAndDelete(id);
    res.redirect('/producting');
})
app.listen(3000, () => {
    console.log("we are listing to the port 3000");
});