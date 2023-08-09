const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing:false
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  if(!editMode){
    res.redirect('/');
  }
  const proId=req.params.productId;
  Product.findById(proId,product=>{
    // if(!product){
    //   res.redirect('/');
    // }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
      editing:editMode,
      product:product
  })
  
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.postEditProduct = (req, res, next) => {
  const proId=req.body.productId;
  const upatedTitle = req.body.title;
  const upatedtImageUrl = req.body.imageUrl;
  const upatedtPrice = req.body.price;
  const upatedtDescription = req.body.description;
  const updateProduct = new Product(proId,upatedTitle, upatedtImageUrl, upatedtDescription, upatedtPrice);
  updateProduct.save();
  res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
  const proId=req.params.productId;
  console.log("deleteId==> "+proId);
  Product.delete(proId);
  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
