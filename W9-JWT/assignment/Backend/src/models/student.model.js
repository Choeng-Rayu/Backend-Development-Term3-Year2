export default (sequelize, DataTypes) =>
    sequelize.define('Student', {
        name: DataTypes.STRING,
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
