const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const typesDiv = document.getElementById('types');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const weightEl = document.getElementById('weight');
const heightEl = document.getElementById('height');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');           
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

let creatureData;
let creatureStats;

fetch('https://rpg-creature-api.freecodecamp.rocks/api/creatures')
  .then(r => r.json())
  .then(data => { creatureData = data; });

function searchCreature() {
  typesDiv.innerHTML = "";
  weightEl.textContent = "";           
  heightEl.textContent = "";           
  hp.textContent = "";
  attack.textContent = "";             
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";

  const fixedInput = searchInput.value.toLowerCase().trim();

  if (!creatureData) {
    return fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${fixedInput}`)
      .then(r => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then(fillFromStats)
      .catch(() => alert("Creature not found"));
  }

  let isFound = false;

  creatureData.forEach(({ id, name }) => {
    if (fixedInput === name.toLowerCase() || fixedInput == id) {
      isFound = true;
      creatureName.textContent = name;
      creatureId.textContent = `#${id}`;
    }
  });

  if (!isFound) {
    alert("Creature not found");      
    return;
  }

  // ✅ FIXED: use fixedInput instead of foundIdOrName
  fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${fixedInput}`)
    .then(r => r.json())
    .then(fillFromStats)
    .catch(() => alert("Creature not found"));
}

function fillFromStats(data) {
  creatureStats = data;
  const { height, id, name, stats, types, weight } = creatureStats;

  if (!creatureName.textContent) {
    creatureName.textContent = name;
  }
  if (!creatureId.textContent) {
    creatureId.textContent = `#${id}`;
  }

  stats.forEach(({ base_stat, name }) => {
    if (name === "hp") hp.textContent = base_stat;
    else if (name === "attack") attack.textContent = base_stat;
    else if (name === "defense") defense.textContent = base_stat;
    else if (name === "special-attack") specialAttack.textContent = base_stat;
    else if (name === "special-defense") specialDefense.textContent = base_stat;
    else if (name === "speed") speed.textContent = base_stat;
  });

  typesDiv.innerHTML = "";
  types.forEach(({ name }) => {
    typesDiv.innerHTML += `<div class="element ${name.toLowerCase()}">${name.toUpperCase()}</div>`;
  });

  weightEl.textContent = weight;
  heightEl.textContent = height;
}

searchButton.addEventListener('click', searchCreature);
