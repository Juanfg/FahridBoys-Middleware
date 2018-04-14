module.exports = function(sequelize, DataType) {
    var Tweet = sequelize.define('tweet', {
        lat: DataType.STRING,
        lon: DataType.STRING,
        userName: DataType.STRING,
        text: DataType.STRING
    }, {
        tableName: 'tweet'
    });

    return Tweet;
}