let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const cardContainer = document.getElementById("toy-collection")

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
      <button class="like-btn">Like <3</button>
    `
    cardContainer.append(toyDiv)
  }


  
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

  toyFormContainer.addEventListener("submit", e => {
    if (e.target.matches('.add-toy-form')){
      e.preventDefault()

      const input = e.target

      const name = input.name.value
      const imgUrl = input.image.value
      fetchPost(name, imgUrl)
    }  
  });


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  

  getToys()
});
