const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");

router.get("/", (req, res, next) => {
  Product.find().exec().then(docs => {
    // if (docs.length >= 0){
      // console.log(docs);
      res.status(200).json(docs);
    // } else {
      // res.status(404).json({
      //   message: "Data is empty"
      // });
    }).catch( err => {
    console.log(err);
    res.status(500).json({
      errror: err
    });
  });
});
router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(201).json({
    message: "handle POST request to /products",
    createrProduct: product,
  });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then((doc) => {
      console.log("from database", doc);
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId
  const updateOps = {};
  for (const ops of req.body){
    updateOps[ops.propName] = ops.value;
  }
  Product.update( {_id: id}, { $set: updateOps} ).exec().then( result => {
    console.log(res);
    res.status(200).json(result)
  }).catch( err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
});
router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({
    _id: id
  }).exec().then(result => {
    res.status(200).json(result)
  }).catch(error => {
    res.status(500).json({
      error: err
    })
  });

});

module.exports = router;
