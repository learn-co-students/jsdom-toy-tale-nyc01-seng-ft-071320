let addToy = false;
let loadedId = 1

document.addEventListener("DOMContentLoaded", () => {
  function renderToys(arrayOfObjects) {
    for(let object of arrayOfObjects) {
      let id = object.loadedId
      let name = object.name
      let image = object.image
      let likes = object.likes
      makeToyCard(name, image, likes, id)
      loadedId+=1;
      
    }
  }

  let cardsDiv = document.querySelector('#toy-collection')

  function makeToyCard(name, image, likes, id) {
    let cardDiv = document.createElement('div')
    cardDiv.className = 'card'
    cardDiv.id = id
    cardDiv.innerHTML = `
      <h2>${name}</h2>
      <img src=${image} class="toy-avatar"/>
      <p><span>${likes}</span> likes</p>
      <button class="like-button">Like ❤️</button>
    `
    cardsDiv.append(cardDiv)
  }

  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => renderToys(toys))

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");


  document.addEventListener("click", (e) => {
    // hide & seek with the form
    if(e.target == addBtn){
      addToy = !addToy;
      if (addToy) {
        toyFormContainer.style.display = "block";
      } else {
        toyFormContainer.style.display = "none";
      }
    }else if(e.target.matches('.like-button')){

      let currentLikesString = e.target.previousElementSibling.children[0].innerText
      let currentLikes = parseInt(currentLikesString)
      let updatedLikes = currentLikes+=1;
      console.log(updatedLikes)
      fetch(`http://localhost:3000/toys/${e.target.parentElement.id}`, {method: "PATCH", headers: {"Content-Type": "application/json", Accept: "application/json"}, body: JSON.stringify({
  
      "likes": updatedLikes
      
    })} )
    e.target.previousElementSibling.children[0].innerText = updatedLikes
    }
  });
  document.addEventListener('submit', function(e) {
    e.preventDefault()
    name = e.target.name.value
    image = e.target.image.value
    likes = 0
    id = loadedId
    fetch('http://localhost:3000/toys', {method: "POST", headers: {"Content-Type": "application/json", Accept: "application/json"}, body: JSON.stringify({
      "name": e.target.name.value,
      "image": e.target.image.value,
      "likes": 0
    })} )
    makeToyCard(name, image, likes, id)
  })
});
