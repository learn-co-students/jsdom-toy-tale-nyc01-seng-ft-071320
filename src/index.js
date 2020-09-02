document.addEventListener("DOMContentLoaded", () => {
    const toyFormContainer = document.querySelector(".container");
    const toyUrl = "http://localhost:3000/toys/";

    const toyCollection = document.querySelector("#toy-collection");

    const fetchToys = () => {
        fetch(toyUrl)
        .then((res) => res.json())
        .then((toys) => renderToys(toys));
    };

    const renderToys = (toys) => {
        for (const aToy of toys) {
        renderToy(aToy);
        }
    };
    
    function renderToy(aToy) {
        const toyCard = document.createElement("div");
        toyCard.classList.add("card");
        toyCard.setAttribute("data-id", aToy.id);
      // This query selector looks for a p tag, with attribute data-id=2
      // and class name toy-likes
      // p.toy-likes[data-id=2]
        toyCard.innerHTML = `
        <h2>${aToy.name}</h2>
        <img src=${aToy.image} class="toy-avatar" />
        <p data-id=${aToy.id} class="toy-likes">${aToy.likes} Likes </p>
        <button class="like-btn" data-id=${aToy.id} data-likes=${aToy.likes}>Like <3</button>
        `;
      //id
        toyCollection.append(toyCard);
      // store the likes
      // likeCounter[aToy.id] = aToy.likes;
      //object    //^key that keeps track of which toy you're on
    }

    const submitHandler = () => {
        const form = document.querySelector(".add-toy-form");
        form.addEventListener("submit", (e) => {
        e.preventDefault();

        const toyNameInput = form.name.value;
        const toyImageUrlInput = form.image.value;

        const newToyObject = {
            name: toyNameInput,
            image: toyImageUrlInput,
            likes: 0,
        };
        // "name": "Woody",
        // "image": "http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png",
        // "likes": 5
        const options = {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify(newToyObject),
        };
            fetch(toyUrl, options)
            .then((res) => res.json())
            .then(renderToy);
        });
    };
    const clickHandler = (e) => {
        let addToy = false;
        const addBtn = document.querySelector("#new-toy-btn");

        addBtn.addEventListener("click", () => {
        // toggle the form open or close
        addToy = !addToy;
        if (addToy) {
            toyFormContainer.style.display = "block";
        } else {
            toyFormContainer.style.display = "none";
        }
    });

    document.addEventListener("click", (event) => {
        if (event.target.matches(".like-btn")) {
            const dataId = event.target.getAttribute("data-id");
            let likesData = parseInt(event.target.getAttribute("data-likes"));

            const dataObject = {
                likes: likesData + 1,
            };

            putToy(dataId, dataObject);
        }
    });
    };

    const putToy = (dataId, dataObject) => {
        const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(dataObject),
        };

        fetch(toyUrl + dataId, options)
        .then((response) => response.json())
        .then((data) => {
            const dataId = data.id;
            const likes = data.likes;

            document.querySelector(`p[data-id="${dataId}"].toy-likes`)
            .innerText = `${likes} Likes`;

            document.querySelector(`button[data-id="${dataId}"].like-btn`)
            .setAttribute("data-likes", likes);
        });
    };

    fetchToys();
    clickHandler();
    submitHandler();
});