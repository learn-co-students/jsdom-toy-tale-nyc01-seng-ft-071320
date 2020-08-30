document.addEventListener("DOMContentLoaded", () => {

  const baseUrl = "http://localhost:3000/toys/"
  const form = document.querySelector(".container")
  //const form = document.getElementsByClassName("container")[0]

  const getToys = () => {
    fetch(baseUrl)
    .then(resp => resp.json())
    .then(toys => renderToys(toys))
  }

  const renderToys = toys => {
    for (const toyObj of toys) {
      (createToy(toyObj))
    }
  }

  function createToy(toyObj) {
    const toyDiv = document.getElementById("toy-collection")
    let newDiv = document.createElement("div")
    newDiv.className = "card"
    newDiv.dataset.toyId = `${toyObj.id}`

    newDiv.innerHTML =
      `<h2>${toyObj.name}</h2>
      <img src="${toyObj.image}" class="toy-avatar">
      <p>${toyObj.likes} likes</p>
      <button class="like-btn">Like <3</button>`

    toyDiv.append(newDiv)
  }

  function clickHandler() {
    const newBtn = document.getElementById('new-toy-btn')
    const likeBtn = document.querySelectorAll('.like-btn')

    document.addEventListener("click", (e) => {
      let clicked = e.target

      if (clicked.innerText == "Add a new toy!") {
        form.style.display = "block";
        newBtn.innerText = "Cancel"
      } else if (clicked.innerText == "Cancel") {
        form.style.display = "none";
        newBtn.innerText = "Add a new toy!"
      } else if (clicked.innerText == "Like <3") {
        let likeInfo = clicked.previousElementSibling
        let toyId = clicked.parentElement.dataset.toyId
        let numLikes = parseInt(likeInfo.innerText.split(" ")[0]) + 1
        likeInfo.innerText = `${numLikes} likes`
        updateLikes(toyId, numLikes)
      }
    })
  }

  function submitHandler() {
    document.addEventListener('submit', (e) => {
      e.preventDefault()

      const name = form.children[0].name.value
      const image = form.children[0].image.value
      const likes = 0

      const newObj = {
        name: name,
        image: image,
        likes: likes
      }

      options = {
        method: "POST",
        headers: {
          "content-type" : "application/json",
          "accept" : "application/json"
        },
        body: JSON.stringify(newObj)
      }

      fetch(baseUrl, options)
      .then(resp => resp.json())
      .then(toy => createToy(toy))

      form.children[0].reset()
    })
  }

  function updateLikes(id, newLike) {
    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({likes: newLike})
    }

    fetch(baseUrl + id, options)
    //.then(resp => resp.json())
  }

  getToys()
  clickHandler();
  submitHandler();
})