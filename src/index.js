let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  showNewToyForm()
  getToys()
  submitNewToy()
  updateToyLikes()


})

const cardContainer = document.getElementById('toy-collection')


function showNewToyForm(){
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })
}

function getToys(){

  fetch('http://localhost:3000/toys')
  .then(function(response){return response.json()})
  .then(function(toys){renderToys(toys)})
}

function renderToys(toyObjs){

  for (let toyObj of toyObjs){
    addToyToDOM(toyObj)
  }
}


function addToyToDOM(toy){

  let toyItem = document.createElement('div')
  toyItem.classList.add('card')
  toyItem.innerHTML =`
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button class="like-btn">Like <3</button>`
  toyItem.dataset.id = toy.id 
  cardContainer.append(toyItem)
}

function postAndRenderToy(name,imageURL){
  fetch('http://localhost:3000/toys',{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "image": imageURL,
        "likes": 0
      })
    })
  .then(function(response){return response.json()})
  .then(getToys())
  .catch(console.log("Things are not rendering right"))

}

function submitNewToy (){
  submitButton = document.querySelector(".add-toy-form").lastElementChild
  
  submitButton.addEventListener('click', function(e){
    e.preventDefault()
    let submitForm = e.target.parentNode
    let newToyName = submitForm.name.value
    let newToyImage = submitForm.image.value
    postAndRenderToy(newToyName, newToyImage)

  })
}

function likeToy(likes, newLikes, id){
  fetch('http://localhost:3000/toys/'+ id,{
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: newLikes
      })
    })
  .then(function(response){return response.json()})
  .then(function(updatedToy){
    let updateLikes = document.querySelector(`[data-id="${updatedToy.id}"]`);
    likes.innerText = `${newLikes} Likes`
  })
  .catch(console.log("Things are not rendering right"))

}

function updateToyLikes (){
  likeButtonsField = document.querySelector("#toy-collection")
  
  likeButtonsField.addEventListener('click', function(e){
    e.preventDefault()
    if (e.target.matches(".like-btn")){
      let likes = e.target.previousElementSibling
      let likeValue = likes.innerText.split(" ")[0]
      let newLikes = parseInt(likeValue,10) + 1
      toyID = likes.parentNode.dataset.id
      likeToy(likes, newLikes, toyID)
    }
  })
}

