const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rating: {
      // type: DataTypes.INTEGER,
      type: DataTypes.FLOAT,
      allowNull: true
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.JSON), 
      allowNull: false,
    },
    createdDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  }, {
    timestamps: false
  });
};
