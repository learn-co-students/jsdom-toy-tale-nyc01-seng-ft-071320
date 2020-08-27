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

  function fetchToys() {
    fetch('http://localhost:3000/toys')
      .then(resp => resp.json())
      .then(json => json.forEach(toy => makeToyCard(toy)))
  }
  fetchToys()

  let toyCollection = document.querySelector('#toy-collection')
  function makeToyCard(toy) {
    let toyCard = document.createElement('div')
    toyCard.className = "card"
    toyCard.dataset.num = toy.id
    let innerStuff = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar">
    <p>${toy.likes}</p>
    <button class="like-btn">❤️</button>
  `
    toyCard.innerHTML = innerStuff
    toyCollection.append(toyCard)
  }

  let formDiv = document.querySelector('.add-toy-form')
  formDiv.addEventListener('submit', e => {
    e.preventDefault();

    let toy = {
      "name": formDiv.name.value,
      "image": formDiv.image.value,
      "likes": 0
    }

    makeToyCard(toy);
    formDiv.reset();

    postToy(toy)

    function postToy(toy) {
      fetch('http://localhost:3000/toys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify(toy),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
    };
  })

  document.addEventListener('click', e => {
    if (e.target.className === 'like-btn') {
      let button = e.target
      let id = button.parentElement.dataset.num
      let likeNum = parseInt(button.previousElementSibling.textContent, 10)
      button.previousElementSibling.textContent = likeNum + 1

      fetch(`http://localhost:3000/toys/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": (likeNum + 1)
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
    }
  })

});
