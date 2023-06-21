const apiUrl = 'https://rickandmortyapi.com/api/character';
const charactersPerPage = 20; // Cantidad de personajes por página
let allCharacters = []; // Variable para almacenar todos los personajes

function fetchCharacters(page) {
  const url = `${apiUrl}?page=${page}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const characters = data.results;
      allCharacters = allCharacters.concat(characters);

      // Verificar si se ha alcanzado la cantidad deseada de personajes
      if (allCharacters.length >= charactersPerPage) {
        allCharacters = allCharacters.slice(0, charactersPerPage); // Limitar a la cantidad deseada
        generateCharacterCards();
      } else if (data.info.next) {
        const nextPage = page + 1;
        fetchCharacters(nextPage);
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function generateCharacterCards() {
  const container = document.getElementById('character-container');

  allCharacters.forEach(character => {
    const card = createCharacterCard(character);
    container.appendChild(card);
  });
}

function createCharacterCard(character) {
  const card = document.createElement('div');
  card.classList.add('character-card');

  const image = document.createElement('img');
  image.src = character.image;
  image.alt = character.name;

  const name = document.createElement('h3');
  name.textContent = character.name;

  const species = document.createElement('p');
  species.textContent = `Species: ${character.species}`;

  const status = document.createElement('p');
  status.textContent = `Status: ${character.status}`;

  card.appendChild(image);
  card.appendChild(name);
  card.appendChild(species);
  card.appendChild(status);

  // Agregar event listener al hacer clic en la imagen para mostrar el pop-up
  image.addEventListener('click', function() {
    showPopup(character);
  });

  return card;
}

function showPopup(character) {
  const popupName = document.getElementById('popup-name');
  const popupSpecies = document.getElementById('popup-species');
  const popupStatus = document.getElementById('popup-status');

  popupName.textContent = character.name;
  popupSpecies.textContent = `Species: ${character.species}`;
  popupStatus.textContent = `Status: ${character.status}`;

  const popupContainer = document.getElementById('popup-container');
  popupContainer.style.display = 'flex';
}

// Agregar event listener al botón de cerrar el pop-up
const closeButton = document.getElementById('popup-close');
closeButton.addEventListener('click', function() {
  const popupContainer = document.getElementById('popup-container');
  popupContainer.style.display = 'none';
});

// Iniciar la obtención de los personajes desde la primera página
fetchCharacters(1);

// Menu
(function () {
  var menuButton = document.getElementById('toggle-menu');
  menuButton.addEventListener('click', function (event) {
    event.preventDefault();
    var menu = document.getElementById('main-menu');
    menu.classList.toggle('is-open');
  });
})();

// Función para realizar la búsqueda
function performSearch() {
    const speciesInput = document.getElementById('species-input');
    const species = speciesInput.value.trim();
  
    // Filtrar los personajes según la especie ingresada
    const filteredCharacters = allCharacters.filter(character => {
      return character.species.toLowerCase().includes(species.toLowerCase());
    });
  
    // Generar las tarjetas de los personajes filtrados
    generateFilteredCharacterCards(filteredCharacters);
  }
  
  // Agregar event listener al botón de búsqueda
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', performSearch);
  
  // Agregar event listener al presionar la tecla "Enter" en el campo de entrada
  const speciesInput = document.getElementById('species-input');
  speciesInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      performSearch();
    }
  });
  
  // Función para generar las tarjetas de los personajes filtrados
  function generateFilteredCharacterCards(characters) {
    const container = document.getElementById('character-container');
    container.innerHTML = ''; // Limpiar el contenedor
  
    characters.forEach(character => {
      const card = createCharacterCard(character);
      container.appendChild(card);
    });
  }
  
  // Limpiar el campo de especie
  speciesInput.value = '';
