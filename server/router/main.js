const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const locals = {
      title: "Node js blog",
      description: "Simple Blog created with node js",
    };
    let perPage = 10;
    let page = req.query.page || 1;

    //olusturulma tarihine gore bloglari siralar
    // aggreate= birlestirme
    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec(); // aggregation icin son komut

    //pagination
    const count = await Post.countDocuments(); //veritabanin da kactane blog oldugunu verir
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      //Eğer bir sonraki sayfa varsa, nextPage değeri kullanılır, aksi takdirde null değeri atanır.
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;

// Aggregation pipeline,
//MongoDB'de veri manipülasyonu işlemlerini
//gerçekleştirmek için kullanılan güçlü bir araçtır.
//Bu pipeline, veri işleme operasyonlarını sıralı bir dizi
//olarak tanımlamanıza olanak tanır. Pipeline, giriş verisini alır,
//bu veriyi bir dizi işlem (operatör) üzerinden
//geçirir ve sonuç olarak işlenmiş veriyi sağlar.
