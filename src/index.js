let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const cardContainer = document.getElementById("toy-collection")

// Loads all the toys in the database


  let getToys = () => {
    fetch("http://localhost:3000/toys")
      .then(resp => resp.json())
      .then(toyData => renderToys(toyData))
  }

  const renderToys = toys => {
    for(const toyObj of toys){
      dataOrg(toyObj)
    }
  }

  let dataOrg = (toyObj) => {
    const toyDiv = document.createElement("div")
    toyDiv.classList.add("card")

    toyDiv.innerHTML = `
      <h2>${toyObj.name}</h2>
      <img src=${toyObj.image} class="toy-avatar" />
      <p>${toyObj.likes} Likes</p>
      <button data-id="${toyObj.id}" class="like-btn">Like <3</button>
    `
    cardContainer.append(toyDiv)
  }

  // Creates a new toy, updates in database and posts to webpage
  const fetchPost = (name, imgUrl) => {
    const newToyObj = fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify
      ({
          "name": name,
          "image": imgUrl,
          "likes": 0
      })
    })
    console.log(newToyObj)
  }

  // Form to submit new toy info

  toyFormContainer.addEventListener("submit", e => {
    if (e.target.matches('.add-toy-form')){
      e.preventDefault()

      const input = e.target

      const name = input.name.value
      const imgUrl = input.image.value
      fetchPost(name, imgUrl)
      getToys()
    }  
  });

// EventListener to hide and display new toy form
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // Function to update toy likes
  let likeListener = () => {
    document.addEventListener("click", function(e){
      if (e.target.matches(".like-btn")){
        let button = e.target
        let id = button.dataset.id
        let pTag = button.previousElementSibling
        let toyLikes = parseInt(pTag.innerText.split(" ")[0])
        let newToyLikes = toyLikes + 1
        patchPost(newToyLikes, id, pTag)
      }
    })
  }


  const patchPost = (likes, id, pTag) => {
    const newToyObj = fetch("http://localhost:3000/toys/" + id, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify
      ({
          likes: likes
      })
    })
    .then(response => response.json())
    .then(toy => {
      const toyButton = document.querySelector(`[data-id="${toy.id}"]`)
      pTag.textContent = `${toy.likes} Likes`
    })
  }

  // Invoke methods and functions and run program sequence
  
  likeListener()
  getToys()  
});
