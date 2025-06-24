import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const User = sequelize.define('User', {
  username: DataTypes.STRING
});

const Profile = sequelize.define('Profile', {
  bio: DataTypes.STRING
});

User.hasOne(Profile);
Profile.belongsTo(User);

export { User, Profile };






