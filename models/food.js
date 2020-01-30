module.exports = function(sequelize, Datatype) {
    var Food = sequelize.define("Food", {
        name: Datatype.STRING,
        devoured: {
            type: Datatype.BOOLEAN,
            defaultValue: false
        }
    });

    return Food;
}