let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById('toy-collection')
  
  const renderToys = (collection) => {
    for(const toy of collection) {
      renderToy(toy)
    }
  }
  
  const renderToy = (toyObj) => {
    const toyDiv = document.createElement('div')
    toyDiv.className = 'card'
    toyDiv.innerHTML = `
      <h2>${toyObj.name}</h2>
      <img src="${toyObj.image}" class="toy-avatar">
      <p>${toyObj.likes} Likes</p>
      <button class="like-btn">Like <3</button>
    `
    toyCollection.append(toyDiv)
  }

  fetch('http://localhost:3000/toys')
    .then(toy => toy.json())
    .then(toys => renderToys(toys))

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener('submit', e => {
    e.preventDefault()
    console.log("good")
  })

});
