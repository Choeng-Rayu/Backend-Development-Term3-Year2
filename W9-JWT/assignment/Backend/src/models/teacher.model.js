export default (sequelize, DataTypes) =>
    sequelize.define('Teacher', {
        name: DataTypes.STRING,
        department: DataTypes.STRING,
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
