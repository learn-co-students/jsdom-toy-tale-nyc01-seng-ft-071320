let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toyCol = document.getElementById("toy-collection")
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
 const form = document.querySelector("form")
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    let name = e.target.name.value
    let image = e.target.image.value
    let likes = 0

    const newToy = {
      name : name,
      image : image,
      likes : likes
    }
    const renderNewT = (newToy) => {
      const divContainer = document.createElement('div')
      divContainer.innerHTML = `
        <div class="card">
        <h2>${newToy.name}</h2>
        <img src=${newToy.image} class="toy-avatar" />
        <p>${newToy.likes}</p>
        <button class="like-btn">Like <3</button>
    </div>
      `
    toyCol.append(divContainer)
    }

    renderNewT(newToy)

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name : name,
        image : image,
        likes :likes
      })

    })
    form.reset()

    
  })

  const clickYandler = () => {
     document.addEventListener('click', e => {
       if(e.target.matches('.like-btn')) {
        //  const toy = document.querySelector()
         const button = e.target
         let id = button.dataset.id
        const p = button.closest('.card').querySelector('p')
        const currentScore = parseInt(p.textContent)
        const newScore = currentScore + 1
        p.textContent = newScore

        let config = {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            "accept": "application/json"
          },
          body: JSON.stringify({
            likes: newScore
          })
        }
         fetch("http://localhost:3000/toys/" + id, config)
         .then(resp => resp.json())
         .then(data => {
          p.textContent = `${newScore} likes`
         })
       }
     })
   }


  

  const renderDom = (toys) => {
    toys.forEach(toyObject => {
      const divContainer = document.createElement('div')
      divContainer.innerHTML = `
        <div class="card">
        <h2>${toyObject.name}</h2>
        <img src=${toyObject.image} class="toy-avatar" />
        <p>${toyObject.likes} likes </p>
        <button class="like-btn" data-id=${toyObject.id}>Like <3</button>
    </div>
      `
    toyCol.append(divContainer)

    })
  }

  // fetches
  const getToys = () => {
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => renderDom(toys))
  }

  getToys()
  clickYandler()

});

// const addBtn = document.querySelector('#new-toy-btn')  // this var targets the new toy button
// const toyForm = document.querySelector('.container') // this var targets the form for adding a new toy to the db
// let addToy = false  // this is just so the form isnt showing all the time
// let divCollect = document.querySelector('#toy-collection') // this var targets the div that holds the toys


// function getToys() {  // this func has ONE responsibility its to get the toys from the db
//   return fetch('http://localhost:3000/toys')
//     .then(res => res.json())
// }

// function postToy(toy_data) {   // this func POSTs the new toy to the db
//   fetch('http://localhost:3000/toys', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: "application/json"
//       },
//       body: JSON.stringify({
//         "name": toy_data.name.value,
//         "image": toy_data.image.value,
//         "likes": 0

//       })
//     })
//     .then(res => res.json())
//     .then((obj_toy) => {
//       let new_toy = renderToys(obj_toy)
//       divCollect.append(new_toy)
//     })
// }

// function likes(e) {   // this func is targeting the likes count and adding a like each time the button is clicked
//   e.preventDefault()
//   let more = parseInt(e.target.previousElementSibling.innerText) + 1

//   fetch(`http://localhost:3000/toys/${e.target.id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"

//       },
//       body: JSON.stringify({
//         "likes": more
//       })
//     })
//     .then(res => res.json())
//     .then((like_obj => {
//       e.target.previousElementSibling.innerText = `${more} likes`;
//     }))
// }

// function renderToys(toy) {  // this func renders all the toys from the db
//   let h2 = document.createElement('h2')
//   h2.innerText = toy.name

//   let img = document.createElement('img')
//   img.setAttribute('src', toy.image)
//   img.setAttribute('class', 'toy-avatar')

//   let p = document.createElement('p')
//   p.innerText = `${toy.likes} likes`

//   let btn = document.createElement('button')
//   btn.setAttribute('class', 'like-btn')
//   btn.setAttribute('id', toy.id)
//   btn.innerText = "like"
//   btn.addEventListener('click', (e) => {
//     // console.log(e.target.dataset);
//     likes(e)
//   })

//   let divCard = document.createElement('div')
//   divCard.setAttribute('class', 'card')
//   divCard.append(h2, img, p, btn)
//   divCollect.append(divCard)
// }


// // add listener to 'Add Toy' button to show or hide form
// addBtn.addEventListener('click', () => {
//   // hide & seek with the form
//   addToy = !addToy
//   if (addToy) {
//     toyForm.style.display = 'block'
//     toyForm.addEventListener('submit', event => {
//       event.preventDefault()
//       postToy(event.target)
//     })
//   } else {
//     toyForm.style.display = 'none'
//   }
// })

// // start by getting all toys

// getToys().then(toys => {
//   toys.forEach(toy => {
//     //function to render toys goes here or something
//     renderToys(toy)
//   })
// })
