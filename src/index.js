let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  const baseUrl = 'http://localhost:3000/toys/'
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector('.add-toy-form')
  const toyDiv = document.querySelector('#toy-collection')
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  const fetchToys = () => {
    fetch(baseUrl)
      .then(resp => resp.json())
      .then(renderToys)
  }
  const renderToys = (toys) => {
    for (const toy of toys) {
      renderToy(toy)
    }
  }
  const renderToy = (toy) => {
    const toyCard = document.createElement('div')
    toyCard.className = "card"
    toyCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" alt="${toy.name}"/>
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
    `
    toyDiv.append(toyCard)
  }
  const submitHandler = () => {
    toyForm.addEventListener('submit', e => {
      e.preventDefault()
      const newToy = {
        "name": toyForm.name.value,
        "image": toyForm.image.value,
        "likes": 0
      }
      postToy(newToy)
    })
  }
  const postToy = (newToy) => {
    const options = {
      method: 'POST',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newToy)
    }
    fetch(baseUrl, options)
      .then(resp => resp.json())
      .then(console.log)
  }
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  submitHandler()
  fetchToys()
});