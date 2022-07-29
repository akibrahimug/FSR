const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class PackageOfCare extends Model {}
  PackageOfCare.init(
    {
      POC_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      PackageOfCare: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please provide a POC" },
          notEmpty: { msg: "POC must not be empty" },
        },
      },
    },
    { sequelize }
  );
  // One to many association
  PackageOfCare.associate = (models) => {
    PackageOfCare.belongsToMany(models.Client, {
      through: models.client_POC,
      as: "clientPOc",
      foreignKey: {
        fieldName: "POC_ID",
        allowNull: false,
      },
    });
  };
  return PackageOfCare;
};