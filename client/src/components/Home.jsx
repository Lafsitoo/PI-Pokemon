import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../redux/actions";
import { Link } from "react-router-dom";
import TypeFilter from "./FilterTypes";
import CreatedFilter from "./FilterCreate";

// -------------------------------------------------------------------------------

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  // -------------------------------------------------------------------------------

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getPokemons());
    alert("Recargando");
  };

  // -------------------------------------------------------------------------------

  return (
    <div>
      <Link to="/create">Crear Pokemon</Link>
      <h1>Pokemons</h1>
      <button onClick={(e) => handleClick(e)}>Volver a cargar</button>
      <div>
        <select>
          <option disabled selected>
            Ordenar Por Ataque
          </option>
          <option value="Asc">Mayor Ataque</option>
          <option value="Desc">Menor Ataque</option>
        </select>
        <br />
        <select>
          <option disabled selected>
            Ordenar Por Nombre
          </option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <TypeFilter />
        <CreatedFilter />
      </div>
    </div>
  );
}
