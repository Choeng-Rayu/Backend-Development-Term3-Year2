export default (sequelize, DataTypes) =>
    sequelize.define('Course', {
        title: DataTypes.STRING,
        description: DataTypes.STRING
    });
