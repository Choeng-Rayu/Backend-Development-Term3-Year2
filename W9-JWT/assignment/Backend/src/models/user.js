import {DataTypes} from 'sequelize';
import bcrypt from 'bcryptjs';

const UserModel = (sequelize) =>{
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true },

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    User.beforeCreate(async (user) =>{
        if(user.password){

            const salt = await bcrypt.genSalt(10); // encryption for ten rounds or characters
            user.password = await bcrypt.hash(user.password, salt);
        
        }
    });

    // hash password before update (optional, only if modified)
    User.beforeUpdate(async (user) =>{
        if(user.changed('password')){
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    });
    return User;
}

export default UserModel;