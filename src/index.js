let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  function renderToys(arrayOfObjects) {
    for(let object of arrayOfObjects) {
      let name = object.name
      let image = object.image
      let likes = object.likes
      makeToyCard(name, image, likes)
    }
  }

  let cardsDiv = document.querySelector('#toy-collection')

  function makeToyCard(name, image, likes) {
    let cardDiv = document.createElement('div')
    cardDiv.className = 'card'
    cardDiv.innerHTML = `
      <h2>${name}</h2>
      <img src=${image} class="toy-avatar"/>
      <p>${likes} likes</p>
      <button class="like-button">Like<3</button>
    `
    cardsDiv.append(cardDiv)
  }

  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => renderToys(toys))

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  document.addEventListener('submit', function(e) {
    e.preventDefault()
  })
});
