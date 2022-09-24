import React from "react";
import { useDispatch } from "react-redux";
import { fPokemonCreated } from "../redux/actions";

export default function CreatedFilter() {
  const dispatch = useDispatch();
  function handleFilterCreated(e) {
    dispatch(fPokemonCreated(e.target.value));
  }
  return (
    <div>
      <select>
        <option value="All">Todos</option>
        <option value="created">Creados</option>
        <option value="api">De la Api</option>
      </select>
    </div>
  );
}
