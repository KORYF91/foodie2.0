var db = require("./models");

module.exports = function (app) {
    app.get("/apti/food", function(req, res) {
        db.Food.FindAll({
      }).then(function(dbFood) {
          res.json(dbFood);
      });
    });
    app.get("/api/Food/:id", function(req, res) {
        // Here we add an "include" property to our options in our findOne query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Post
        db.Food.findOne({
          where: {
            id: req.params.id
          },
          include: [db.Post]
        }).then(function(dbFood) {
          res.json(dbFood);
        });
      });
    
      app.post("/api/Food", function(req, res) {
        db.Food.create(req.body).then(function(dbFood) {
          res.json(dbFood);
        });
      });
    
      app.delete("/api/Food/:id", function(req, res) {
        db.Food.destroy({
          where: {
            id: req.params.id
          }
        }).then(function(dbFood) {
          res.json(dbFood);
        });
      });
    
    };
    
