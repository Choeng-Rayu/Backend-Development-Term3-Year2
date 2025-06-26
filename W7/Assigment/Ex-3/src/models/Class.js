import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Class = sequelize.define('Class', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Class;
};