const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll().
  then(([rows,fieldData])=>{
    console.log(rows)
    res.render('shop/index', {
      prods:rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err=>console.log(err));
};

exports.getProductId=(req, res, next)=>{
  const proId=req.params.productId;
  Product.findById(proId,product=>{
    res.render('shop/product-detail',{product:product,pageTitle:product.title,path:'/products'})
  });
  
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll().
  then(([rows,fieldData])=>{
    console.log(rows)
    res.render('shop/index', {
      prods:rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err=>console.log(err));
  
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};
exports.postCart = (req, res, next) => {
  const proId=req.body.productId;
  Product.findById(proId,(product)=>{
    Cart.addCart(proId,product.price)
  })
  res.redirect('/cart');
};


exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
