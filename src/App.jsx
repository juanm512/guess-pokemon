import React from "react";

import API from "./api";
import {Loader} from "./components/Loader";
import "./loader.css";

function App() {
  async function getRandomPokemon(){
    let pokemonRandom = await API.random();

    return pokemonRandom;
  }

  const [charged, setCharged] = React.useState(false);
  const [pokemon, setPokemon] = React.useState();
  const [victories, setVictories] = React.useState(0);
  const [failures, setFailures] = React.useState(0);

  React.useEffect(() => {
    setTimeout(async () => {
      let randomP = await getRandomPokemon();

      setPokemon(randomP);
    }, 4200);
  }, []);

  const guessPokemon = (event) => {
    event.preventDefault();
    const pokemonInput = event.target.elements.pokemonInput;

    if (
      pokemonInput.value.replaceAll(" ", "").toLowerCase() ===
      pokemon.name.replaceAll(" ", "").toLowerCase() && charged === false
    ) {
      setCharged(true);
      setVictories(victories+1);
      pokemonInput.classList.add("is-success");
      document.querySelector("#" + pokemon.name).classList.remove("silueta");
      document.querySelector("#pokemonNameText").innerHTML = pokemon.name;
      setTimeout(() => {
        document.querySelector("#" + pokemon.name).classList.add("silueta");
        pokemonInput.classList.remove("is-success");
        setPokemon(null);
        setCharged(false);
      }, 2000);
      setTimeout(async () => {
        let randomP = await getRandomPokemon();

        setPokemon(randomP);
      }, 4200);
    } else if (charged === false) {
      setCharged(true);
      setFailures(failures+1);
      pokemonInput.classList.add("is-error");
      setTimeout(() => {
        document.querySelector("#" + pokemon.name).classList.add("silueta");
        document.querySelector("#pokemonNameText").innerHTML = "Error: " + pokemon.name.toUpperCase() + " es el nombre";
        pokemonInput.classList.remove("is-error");
        setPokemon(null);
        setCharged(false);
      }, 2000);
      setTimeout(async () => {
        let randomP = await getRandomPokemon();

        setPokemon(randomP);
      }, 4200);
    }
  };

  return (
    <>
      <main className="nes-container with-title is-centered">
        <p className="title">Adivina el Pokemon!</p>
        {pokemon ? (
          <>
            <p className="nes-text " id="pokemonNameText">
              Cual es este pokemon?
            </p>
            <img
              className="silueta"
              height="330px"
              id={pokemon.name}
              src={pokemon.image}
              width="330px"
            />
            <form className="nes-field is-inline" onSubmit={guessPokemon}>
              {/* <label htmlFor="name_field">Insert pokemon Name</label> */}
              <input className="nes-input" id="pokemonInput" type="text" />
              <input className="nes-btn is-primary" type="submit" value="Adivinar" />
            </form>
            <div className="nes-field is-block">
              <p className="nes-text">
                Victories: <span className="nes-text is-success">{victories}</span>
              </p>
              {/* <p>|</p> */}
              <p className="nes-text">
                Failures: <span className="nes-text is-error">{failures}</span>
              </p>
            </div>
          </>
        ) : (
          <>
            <p>Fetching pokemon</p>
            <Loader />
          </>
        )}
      </main>
    </>
  );
}

export default App;
