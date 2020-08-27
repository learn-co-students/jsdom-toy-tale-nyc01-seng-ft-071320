let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  let toyArray = [];
  const toysDiv = document.querySelector("div#toy-collection")

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', e => {
        e.preventDefault()
        console.log(e.target)
        makeToy(e.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const getToys = () => {
    fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toyCollection => { 
      for (const toy of toyCollection) {
        renderToys(toy);
      }  
      })
  }
  const makeToy = (toyForm) => {
    fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toyForm.name.value,
        "image": toyForm.image.value,
        "likes": 0

      })
    })
    .then(response => response.json())
    .then(toyObject => { 
      let new_toy = renderToys(toyObject);
      toysDiv.append(new_toy)
      }  
    )}
  
  document.addEventListener('click', e => {
  
    if (e.target.matches('button.like-btn')){
      let toyId = e.target.parentElement.dataset.number
      let pTag = e.target.previousElementSibling;
      let pInnerText = pTag.innerText 
      let pLikes = pInnerText.replace("Likes:", "");
      let likeNum = parseInt(pLikes, 10);
      console.log(likeNum);
      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": likeNum +=1
        })
    })
  } 
})
  
    
  function renderToys(toy) {
    toyArray.push(toy);
    for (const aToy of toyArray){
      toysDiv.insertAdjacentHTML('afterend', `<div class="card" data-number="${aToy.id}">
        <h2>${aToy.name}</h2>
        <img src="${aToy.image}" class="toy-avatar">
        <p>Likes: ${aToy.likes}</p>
        <button class="like-btn">Like <3</button>
      </div>`);
      
    }
  }
  console.log(toyArray);
  getToys()
});
