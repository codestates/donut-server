'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Activity, {
        foreignkey: 'ownerid'
      });

      User.belongsToMany(models.Skill, { through: 'UserSkills'});
      User.belongsToMany(models.Activity, { through: 'ActivityParticipants' });

    }
  };

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull:true,
      unique:true
    },
    githubId: {
      type: DataTypes.INTEGER,
      allowNull:true,
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull:true
    },
    username: {
      type:DataTypes.STRING,
      allowNull: false
    },
    latlon: {
      type: DataTypes.STRING,
      allowNull: true
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: true
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User'
  });
  
  return User;
};