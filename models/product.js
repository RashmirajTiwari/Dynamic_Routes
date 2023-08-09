const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    
    getProductsFromFile(products => {
      if(this.id){
        const existingIndex=products.findIndex(product=>product.id===this.id);
        const updatedProduct=[...products];
        updatedProduct[existingIndex]=this;
        console.log(updatedProduct);
        fs.writeFile(p, JSON.stringify(updatedProduct), err => {
          console.log(err);
        });
      }else{
        this.id=Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
     
    });
  }
  static delete(id) {
    getProductsFromFile(products => {
      if(id){
        const existingIndex=products.findIndex(product=>product.id===id);
        const updatedProduct=[...products];
        updatedProduct[existingIndex]={};
        console.log(updatedProduct);
        fs.writeFile(p, JSON.stringify(updatedProduct), err => {
          console.log(err);
        });
   } 
  });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id,cb){
    getProductsFromFile(products=>{
      const product=products.find(p=>p.id===id)
      cb(product);
    })
  }
};
