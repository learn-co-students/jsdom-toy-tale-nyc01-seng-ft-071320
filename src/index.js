let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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

  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toyData => renderToys(toyData))
    
  const renderToys = toys => {
    for(const toyObj of toys){
      renderToy(toyObj)
    }
  } 

  const toyCollectDiv = document.querySelector("#toy-collection")

  function renderToy(toyObj) {
    const toyDiv = document.createElement("div")
    toyDiv.classList.add("card")
    toyCollectDiv.append(toyDiv)

      toyDiv.innerHTML =
      `<h2>${toyObj.name}</h2>
      <img class="toy-avatar" alt="${toyObj.name}"
      src="${toyObj.image}" width="250"/>
      <p>${toyObj.likes}</p>
      <button class="like-btn">Like</button>`
  }

  const newToyForm = document.querySelector(".add-toy-form")
  
  const submitHandler = () => {
    newToyForm.addEventListener('submit', e => {
      e.preventDefault()
      const form = e.target
      const name = e.target[0].value
      const image = e.target[1].value

      const newToyObj = {
          name: name,
          image: image,
          likes: 0
      }
      renderToy(newToyObj)
      form.reset()
    });
  }

  toyCollectDiv.addEventListener("click", function(e){
    if (e.target.matches(".like-btn")){
      let toyLikes = e.target.previousElementSibling.innerText
      let numLikes = parseInt(toyLikes)
      const newLikes = numLikes += 1
      // const patchLikes = {
      //   likes: newLikes
      // }
      // renderToy(patchLikes)

      
      
    }})
    
    PATCH fetch("https://localhost:3000/toys/:id", 
      {method: 'PATCH', 
      body: JSON.stringify({"likes:" newLikes}), 
      headers: {"Content-Type": "application/json",
      Accept: "application/json"}}
    .then(resp => resp.json())
    .then(data => console.log(data))


submitHandler()
});