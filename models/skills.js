'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Skill.belongsToMany('User', { through: 'UserSkills'});
      Skill.belongsToMany('Activity', { through: 'ActivitySkills'});

    }
  };
  Skills.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    }
  }, {
    sequelize,
    modelName: 'Skill',
  });
  return Skill;
};