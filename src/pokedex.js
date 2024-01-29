const form = document.querySelector(".form");
const input = document.querySelector(".input_search");
const buttonNext = document.querySelector(".btn-next");
const buttonPrev = document.querySelector(".btn-prev");
const pokemonName = document.querySelector(".pokemon_name");
const pokemonImage = document.querySelector(".pokemon_image");
const pokemonNumber = document.querySelector(".pokemon_number");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
      searchPokemon = data.id;
  } else {
    pokemonName.innerHTML = "Ash didn't found this pokemon yet";
    pokemonNumber.innerHTML = "";
    pokemonImage.src = "assets/img/Ash.gif";
    pokemonName.style.fontSize = "0.85rem";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
  input.value = "";
});

buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

renderPokemon(searchPokemon);
