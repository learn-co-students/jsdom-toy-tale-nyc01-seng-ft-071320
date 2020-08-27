let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const fields = document.querySelector('form').children
  
  document.addEventListener("click", (e) => {
    e.preventDefault()
    // hide & seek with the form
    const button = e.target
    if (button.matches("#new-toy-btn")) {
      addToy = !addToy;
      if (addToy) {
        toyFormContainer.style.display = "block";
      } else {
        toyFormContainer.style.display = "none";
      }
    } else if(button.matches(".submit")){
      const nameField = fields[1].value
      const imgField = fields[3].value
      createToy(nameField, imgField)
    }
    
  });
  function createToy(name, imageURL, like=0) {
    const collection = document.getElementById('toy-collection');
      const div = document.createElement('div');
      div.className = "card";

      const h2 = document.createElement('h2');
      h2.innerText = name;

      const img = document.createElement('img');
      img.src = imageURL;

      const p = document.createElement('p');
      p.innerText = like;

      const likeBtn = document.createElement('button');
      likeBtn.className = "like-btn"; 
      
      div.append(h2);
      div.append(img);
      div.append(p);
      div.append(likeBtn);
      collection.append(div);
    }

  const getToys = () => {
    fetch('http://localhost:3000/toys')
      .then(function(response){
        return response.json();
      })
      .then(function(toyCollection){
        console.log(toyCollection);

        for(const toy of toyCollection) {
          const collection = document.getElementById('toy-collection');
          const div = document.createElement('div');
          div.className = "card";

          const h2 = document.createElement('h2');
          h2.innerText = toy.name;

          const img = document.createElement('img');
          img.src = toy.image;

          const p = document.createElement('p');
          p.innerText = toy.likes;

          const likeBtn = document.createElement('button');
          likeBtn.className = "like-btn"; 
          
          div.append(h2);
          div.append(img);
          div.append(p);
          div.append(likeBtn);
          collection.append(div);
        }

      })
  }

  getToys();


});



//TODO
//Create Server
//Fetch Toys from db
//Add Toy info to div class card
  //make card for each toy
    //make toy elements
    //add toy elements to toy card
  //add each card to toy collection div
//Add New Toy upon submition of form
//Increase Toy likes