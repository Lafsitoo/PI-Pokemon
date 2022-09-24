import { ERROR, GET_POKEMONS } from "./../actions/types";

const initialState = {
  pokemons: [],
  allPokemons: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
