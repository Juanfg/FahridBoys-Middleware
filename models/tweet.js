module.exports = function(sequelize, DataType) {
    var Tweet = sequelize.define('tweet', {
        id: {
            type: DataType.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        lat: DataType.STRING,
        lng: DataType.STRING,
        userName: DataType.STRING,
        text: DataType.STRING,
        categoryId: {
            type: DataType.INTEGER,
            references: {
                model: 'category',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    }, {
        tableName: 'tweet'
    });

    return Tweet;
}