const creatureName = document.getElementById('creature-name');
    const creatureId = document.getElementById('creature-id');
    const typesDiv = document.getElementById('types');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const weightEl = document.getElementById('weight');
    const heightEl = document.getElementById('height');
    const hp = document.getElementById('hp');
    const defense = document.getElementById('defense');
    const specialAttack = document.getElementById('special-attack');
    const specialDefense = document.getElementById('special-defense');
    const speed = document.getElementById('speed');
    let creatureData;
    let creatureStats;

    // Fetching Data
    fetch('https://rpg-creature-api.freecodecamp.rocks/api/creatures')
    .then(response => response.json())
    .then((data)=>{creatureData = data; console.log(creatureData)});


    fetch('https://rpg-creature-api.freecodecamp.rocks/api/creature/1')
    .then(response => response.json())
    .then(data=>{console.log(data)})
    // Functions
    function searchCreature(){
        typesDiv.innerHTML = "";
        weight.textContent = "";
        height.textContent = "";
        hp.textContent = "";
        attack.textContent = "";
        defense.textContent = "";
        specialAttack.textContent = "";
        specialDefense.textContent = "";
        speed.textContent = "";

        let fixedInput = searchInput.value.toLowerCase().trim();
        let isFound = false;
        creatureData.forEach(({id, name}, index) => {
            if(fixedInput === name.toLowerCase() || fixedInput == id){
                isFound = true;
                creatureName.textContent = name;
                creatureId.textContent = `#${id}`;
            }
            
        })
        if(!isFound){
            alert("Creature not found");
            return;
        }

        fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${fixedInput}`)
        .then(response => response.json())
        .then(data=>{creatureStats = data;
            const {height, id, name, special, stats, types, weight} = creatureStats;
            stats.forEach(({base_stat, name})=>{
                if(name === "hp"){
                    hp.textContent = base_stat;
                } else if(name === "attack"){
                    attack.textContent = base_stat;
                } else if(name === "defense"){
                    defense.textContent = base_stat;
                } else if(name === "special-attack"){
                    specialAttack.textContent = base_stat;
                } else if(name === "special-defense"){
                    specialDefense.textContent = base_stat;
                } else if(name === "speed"){
                    speed.textContent = base_stat;
                }
            })
            types.forEach(({name})=>{
                typesDiv.innerHTML += `<div class="element ${name.toLowerCase()}">${name.toUpperCase()}</div>`;
            })
            weightEl.textContent = weight;
            heightEl.textContent = height;
        })
    }

    // Event Listeners
    searchButton.addEventListener('click', searchCreature);
