let addToy = false

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-toy-btn")
    const toyFormContainer = document.querySelector(".container")
    const toyUrl = "http://localhost:3000/toys/"

    const toyCollection = document.querySelector('#toy-collection')
        
    const fetchToys = () => {
        fetch(toyUrl)
        .then(res => res.json())
        .then(toys => renderToys (toys))
    }

    const renderToys = toys => {
        for(const aToy of toys) {
            renderToy(aToy)
        }
    }
    
    function renderToy(aToy){
        const toyCard = document.createElement('div')
        toyCard.classList.add('card')
        toyCard.setAttribute("data-id", aToy.id)

        toyCard.innerHTML = `
        <h2>${aToy.name}</h2>
        <img src=${aToy.image} class="toy-avatar" />
        <p>${aToy.likes} Likes </p>
        <button class="like-btn">Like <3</button>
        `
        //id 
        toyCollection.append(toyCard)
    }

    const submitHandler = () => {
        const form = document.querySelector('.add-toy-form')
        form.addEventListener('submit', e => {
            e.preventDefault()
            
            const toyNameInput = form.name.value
            const toyImageUrlInput = form.image.value

            const newToyObject = {
                
                name: toyNameInput,
                image: toyImageUrlInput,
                likes: 0
            }
            // "name": "Woody",
            // "image": "http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png",
            // "likes": 5
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newToyObject)
            }
            fetch(toyUrl, options)
            .then(res => res.json())
            .then(renderToy)
        })
    }

    addBtn.addEventListener("click", () => {       
        addToy = !addToy;
        if (addToy) {
            toyFormContainer.style.display = "block"
        } else {
            toyFormContainer.style.display = "none"
        } 
    })

    fetchToys()
    submitHandler()
})

// switch (expression) {
//     case value1:
//       //Statements executed when the
//       //result of expression matches value1
//       [break;]
//     case value2:
//       //Statements executed when the
//       //result of expression matches value2
//       [break;]