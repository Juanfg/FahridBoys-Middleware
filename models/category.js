module.exports = function(sequelize, DataType) {
    var Category = sequelize.define('category', {
        id: {
            type: DataType.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataType.STRING
    }, {
        tableName: 'category'
    });

    return Category;
}