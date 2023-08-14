
// const path = require('path');
// const Cart = require('./cart');
// const db = require('../util/database');


// module.exports = class Product {
//   constructor(id,title, imageUrl, description, price) {
//     this.id=id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//    return db.execute('INSERT INTO products(title,price,description,imageUrl)VALUES(?,?,?,?)',
//     [this.title,this.price,this.description,this.imageUrl]
//     );
   
//   }
//   static delete(id) {
//     return db.execute('DELETE FROM products where id=?',[id])
//   }

//   static fetchAll() {

//     return db.execute('select * from products');
    
//   }

//   static findById(id,cb){
    
//   }
// }
const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const Product=sequelize.define('product',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  title:Sequelize.STRING,
  price:{
    type:Sequelize.DOUBLE,
    allowNull:false,
  },
  imageUrl:Sequelize.STRING,
  description:{
    type:Sequelize.STRING,
    allowNull:false
  }
})
module.exports=Product;