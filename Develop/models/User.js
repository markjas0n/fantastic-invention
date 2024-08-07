const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const bcrypt = require('bcryptjs');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compare(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: (newUserData) => {
        newUserData.password = bcrypt.hashSync(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: (updatedUserData) => {
        updatedUserData.password = bcrypt.hashSync(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: false,
    modelName: 'User',
  }
);

module.exports.User;
