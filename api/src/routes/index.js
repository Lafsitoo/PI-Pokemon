// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Router } = require("express");
const router = Router();
const { URL_POKE, URL_TYPE } = require("../utils/util");
const axios = require("axios");
const { Pokemon, Type } = require("../db");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
  const pokeUrl = await axios.get(URL_POKE);
  const pokeApi = await pokeUrl.data.results.map(async (el) => {
    const pokeInfo = await axios.get(el.url);
    return {
      id: pokeInfo.data.id,
      name: pokeInfo.data.name,
      types: pokeInfo.data.types.map((e) => {
        return e.type.name;
      }),
      hp: pokeInfo.data.stats[0].base_stat,
      attack: pokeInfo.data.stats[1].base_stat,
      defense: pokeInfo.data.stats[2].base_stat,
      speed: pokeInfo.data.stats[5].base_stat,
      height: pokeInfo.data.height,
      weight: pokeInfo.data.weight,
      img: pokeInfo.data.sprites.other.dream_world.front_default,
    };
  });
  const promesa = await Promise.all(pokeApi);
  // console.log(promesa);
  return promesa;
};

const getDbInfo = async () => {
  let dbPokemon = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return dbPokemon.map((e) => {
    return {
      id: e.id,
      name: e.name,
      hp: e.hp,
      attack: e.attack,
      defense: e.defense,
      speed: e.speed,
      height: e.height,
      weight: e.weight,
      types: e.types.map((e) => e.name),
      img: e.img,
      createAtDB: e.createAtDB,
    };
  });
};

const getAllPokemon = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

// -------------------------------------------------------------------------------------

router.get("/pokemons", async (req, res) => {
  const { name } = req.query;
  // console.log(name)
  let pokemons = await getAllPokemon();
  if (name) {
    let pokemonName = pokemons.filter(
      (e) => e.name.toLowerCase() === name.toLowerCase()
    ); //RETURN IMPLICITO con === en vez de includes me busca solo lo que se igual bulbasor no me va a dar bulbasor pro por ej
    // console.log(pokemonName)
    pokemonName.length
      ? res.status(200).send(pokemonName)
      : res.status(404).send("El pokemon no se encuentra disponible");
  } else {
    res.status(200).send(pokemons);
  }
});

router.get("/types", async (req, res) => {
  const dataTypes = await axios.get(URL_TYPE);
  const pokeTypes = dataTypes.data.results.map((e) => e.name);
  pokeTypes.forEach((e) => {
    Type.findOrCreate({
      where: { name: e },
    });
  });
  const pokeAllTypes = await Type.findAll();
  res.send(pokeAllTypes);
});

router.get("/pokemons/:id", async (req, res) => {
  const { id } = req.params;
  const pokemons = await getAllPokemon();
  if (id) {
    let pokemon = pokemons.filter((e) => e.id == id);
    pokemon.length
      ? res.status(200).send(pokemon)
      : res.status(404).send("No existe pokemon con ese id");
  }
});

router.post("/pokemon", async (req, res) => {
    const { name, types, image, weight, height, hp, attack, defense, speed } =
    req.body;
  // console.log(req.body);

  try {
    if (name && weight && height && hp && attack && defense && speed) {
      const pok = await Pokemon.create({
        name: name.toLowerCase(),
        image: image
          ? image
          : "https://img.pokemondb.net/sprites/black-white/anim/normal/ditto.gif",
        weight: parseInt(weight),
        height: parseInt(height),
        hp: parseInt(hp),
        attack: parseInt(attack),
        defense: parseInt(defense),
        speed: parseInt(speed),
      });
      let typesDb = await Type.findAll({
        where: { name: types },
      });
      pok.addType(typesDb);

      res.status(200).json(pok);
    } else throw new Error("Some necesary fields are clean");
  } catch (error) {
    console.log("Error trying to post");
    console.error(error);
  }
});

module.exports = router;
