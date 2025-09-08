const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");

const infoType = document.querySelector(".info_type");
const infoHeight = document.querySelector(".info_height");
const infoWeight = document.querySelector(".info_weight");
const infoHP = document.querySelector(".info_hp");
const infoAttack = document.querySelector(".info_attack");
const infoDefense = document.querySelector(".info_defense");

const form = document.querySelector(".form");
const input = document.querySelector(".input_search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data.sprites.other["official-artwork"].front_default || data.sprites.front_default;
    input.value = "";
    searchPokemon = data.id;

    // 🟢 Preenchendo a tabela de informações
    infoType.innerHTML = data.types.map(type => type.type.name).join(", ");
    infoHeight.innerHTML = `${data.height / 10} m`;
    infoWeight.innerHTML = `${data.weight / 10} kg`;

    const stats = {
      hp: data.stats.find(stat => stat.stat.name === "hp").base_stat,
      attack: data.stats.find(stat => stat.stat.name === "attack").base_stat,
      defense: data.stats.find(stat => stat.stat.name === "defense").base_stat,
    };

    infoHP.innerHTML = stats.hp;
    infoAttack.innerHTML = stats.attack;
    infoDefense.innerHTML = stats.defense;

  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Not found!";
    pokemonNumber.innerHTML = "";

    infoType.innerHTML = "";
    infoHeight.innerHTML = "";
    infoWeight.innerHTML = "";
    infoHP.innerHTML = "";
    infoAttack.innerHTML = "";
    infoDefense.innerHTML = "";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
