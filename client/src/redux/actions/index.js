import axios from "axios";
import { ERROR, GET_POKEMONS, FILTER_BY_TYPE, FILTER_CREATED } from "./types";

export function getPokemons() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/pokemons", {});
      return dispatch({
        type: GET_POKEMONS,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: {
          name: error.name,
          message: error.message,
        },
      });
    }
  };
}

export function fPokemonsByTypes(payload){
  return{
      type:FILTER_BY_TYPE,
      payload
  }
}

export function fPokemonCreated(payload){
  return{
      type:FILTER_CREATED,
      payload
  }
}
