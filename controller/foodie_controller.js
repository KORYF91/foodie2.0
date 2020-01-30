var express = require("express");
var router = express.Router();

var db = require("../models/");

router.get("/", function(req, res){
    db.Food.findAll().then(function(foodData){
        console.log(foodData);
        var hbsObject = {food: foodData}
         res.render("index", hbsObject);
    })
})
router.post("/api/food", function(req, res){
    db.Food.create({
      name: req.body.name
    }).then(function(result){
        console.log(result);
        res.redirect("/")
    });
});
router.put("/api/food/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    db.Food.update({
      devoured: true
    }, {
      where:{
        id: req.params.id
      }
    }).then(function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.redirect("/");
      }
    });
  });
  
  router.delete("/api/food/:id", function(req, res) {
      
    db.Food.destroy({where: req.params.id}).then(function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.redirect("/");
      }
    });
  });
  

module.exports = router;