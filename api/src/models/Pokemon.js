const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notNull: true, notEmpty: true },
      },
      hp: {
        type: DataTypes.FLOAT(1),
        validate: {
          min: 1,
          max: 100,
        },
        isNumeric: true,
      },
      attack: {
        type: DataTypes.FLOAT(1),
        validate: {
          min: 1,
          max: 100,
        },
      },
      defense: {
        type: DataTypes.FLOAT(1),
        validate: {
          min: 1,
          max: 100,
        },
      },
      speed: {
        type: DataTypes.FLOAT(1),
        validate: {
          min: 1,
          max: 100,
        },
      },
      height: {
        type: DataTypes.FLOAT(1),
        validate: {
          min: 1,
          max: 100,
        },
      },
      weight: {
        type: DataTypes.FLOAT(1),
        validate: {
          min: 1,
          max: 100,
        },
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: 'https://img.pokemondb.net/sprites/black-white/anim/shiny/ditto.gif',
      },
      createdInDB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      }
    },
    { timestamps: false }
  );
};