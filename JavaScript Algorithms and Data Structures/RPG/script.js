const input = document.getElementById("search-input");
const button = document.getElementById("search-button");

const card = document.getElementById("creature-card");
const nameEl = document.getElementById("creature-name");
const idEl = document.getElementById("creature-id");
const typesEl = document.getElementById("types");

const specialName = document.getElementById("special-name");
const specialDesc = document.getElementById("special-description");

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const spAttack = document.getElementById("special-attack");
const spDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const typeColors = {
  fire: "type-fire",
  water: "type-water",
  rock: "type-rock",
  grass: "type-grass",
  poison: "type-poison",
  electric: "type-electric",
  ice: "type-ice",
  flying: "type-flying",
  psychic: "type-psychic",
  dark: "type-dark",
  dragon: "type-dragon",
  fairy: "type-fairy",
  steel: "type-steel"
};

button.addEventListener("click", async () => {
  const query = input.value.trim().toLowerCase();
  if (!query) return;

  try {
    const res = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${query}`);
    if (!res.ok) throw new Error();

    const data = await res.json();

    nameEl.textContent = data.name.toUpperCase();
    idEl.textContent = `#${data.id}`;
    document.getElementById("weight").textContent = data.weight;
    document.getElementById("height").textContent = data.height;


    typesEl.innerHTML = "";
    data.types.forEach(t => {
      const span = document.createElement("span");
      span.textContent = t.name;
      span.classList.add(typeColors[t.name.toLowerCase()] || "type-default");
      typesEl.appendChild(span);
    });

    specialName.textContent = data.special.name;
    specialDesc.textContent = data.special.description;

    const statMap = {};
    data.stats.forEach(s => {
      statMap[s.name] = s.base_stat;
    });

    hp.textContent = statMap.hp;
    attack.textContent = statMap.attack;
    defense.textContent = statMap.defense;
    spAttack.textContent = statMap["special-attack"];
    spDefense.textContent = statMap["special-defense"];
    speed.textContent = statMap.speed;

    card.classList.remove("hidden");
  } catch {
    alert("Creature not found");
    card.classList.add("hidden");
  }
});