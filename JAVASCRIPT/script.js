const apiUrl = 'https://rickandmortyapi.com/api/character';
const charactersPerPage = 15; // Cantidad de personajes por página
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
