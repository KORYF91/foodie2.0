var express = require("express");
var router = express.Router();

var db = require("../models/");
console.log("routes connected")
router.get("/", function(req, res){
  console.log("inside the / route");
    db.Food.findAll().then(function(foodData){
        //console.log(foodData);
        var hbsObject = {food: foodData}
        console.log(hbsObject)
         res.render("index", hbsObject);
    })
})
router.post("/food", function(req, res){

  console.log("food name: " +req.body.name)
    db.Food.create({
      name: req.body.name
}).then(function(result){
        console.log(result);
        res.redirect("/")
    });
});
router.put("/foodie/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    db.Food.update({
      devoured: true
    },
     {
      where:{
        id: req.params.id
      }
    }).then(function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
       res.redirect("/")
      }
    });
  });
  
  // router.delete("/foodie/:id", function(req, res) {
  //   var condition = "id = " + req.params.id;
  
  //   db.Food.delete(condition, function(result) {
  //     if (result.affectedRows == 0) {
  //       // If no rows were changed, then the ID must not exist, so 404
  //       return res.status(404).end();
  //     } else {
  //       res.status(200).end();
  //     }
  //   });
  // });
  

module.exports = router;