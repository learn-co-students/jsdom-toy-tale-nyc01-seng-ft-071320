// woody={
// id: 1,
// image: "http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png",
// likes: 5,
// name: "Woody"
// }


# inside submitHandler #

const options = {
    method: "POST",
    headers: {
        "content-type": "application/json", // called mime types. tells server that we are giving it JSON data
        "accept": "application/json" // tells backend to send back json in return
    },
    body: JSON.stringify(newToy) // pass in the new object created with form ex: newToy  
}

fetch(baseUrl, options)
.then(response => response.json() )
.then(data => renderToy(data) ) // pessimistic rendering 


