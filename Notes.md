   * `npm install -g json-server`
   * `json-server --watch db.json`
<!-- 
// Div in toy collection id="toy-collection" -->

When the page loads,

DOMContentLoad

 make a 'GET' request to fetch all the toy objects
 
 fetch(url_to_all_toys)
 .thing(resp => resp.json())
 .thing(toys => do some function )
 
 function:
    - make div w/ class="card"
        -what attributes does a toy have 
    -forEach toy in object for( const toy in toys )
    -Appending to selected div 
 
 With the
response data, make a `<div class="card">` for each toy and add it to the
toy-collection `div`.

Deliverable 2:
<!-- select the div where we want to place this

eventlistener for a submit

e.preventDefault -->

assign that data to variables 

create post to database (new Object in JSON file) from variables 

call our render function on that data to display on page 

Deliverable 3: 

locate button being clicked 

add event listener to this button 

send patch request 



