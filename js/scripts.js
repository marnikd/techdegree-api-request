/*
    javascript for the API requestp program
    by Marnik Deimann
*/

//show user that the page is loading, because fetching all the data takes a while (at least with my laptop)
document.querySelector('.header-text-container').innerHTML = "<h1>Loading...</h1>";

/*fetch all the data and get the results part of the response 
then the cards and modals are created for every fetched person and behaviour is added to the modals
finally the old html is placed back and the loading... part is removed
if an error occurs this is displayed to the user*/

fetch('https://randomuser.me/api/?results=12&nat=us')
.then(response => response.json())
.then(jason=> jason.results)
.then(data =>{
createCards(data);
createModals(data);
addBehaviour();
addSearchbar();
})
.finally(()=>document.querySelector('.header-text-container').innerHTML = "<h1>AWESOME STARTUP EMPLOYEE DIRECTORY</h1>")
.catch(err => {
    document.querySelector('.header-text-container').innerHTML = "<h1>Failed to load site! Sorry...</h1>";
    console.error(Error('Failed to fetch'));
});


//takes as input an array of persons and using template literals the right html is created for all persons
//all the html is collected as one element and the innerhtml of the gallery is set to this html
function createCards(person){
  let cards = document.getElementById('gallery'); 
  for(let i = 0; i < person.length; i++){ 
    cards.innerHTML += `
    <div class="card ${person[i].cell}">
        <div class="card-img-container">
            <img class="card-img" src="${person[i].picture.thumbnail}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap"> ${person[i].name.first} ${person[i].name.last}</h3>
            <p class="card-text">${person[i].email}</p>
            <p class="card-text cap">${person[i].location.city}, ${person[i].location.state}</p>
        </div>
    </div>
    `;
   showModal(document.getElementsByClassName(`${person[i].cell}`)[0]);
  }
}

/*function with as input an array of persons. First creates a div element with id modals which is added to the page
then all modals are created using template literals and is added to the innerhtml of the created element
lastly the display settings of all modals is set to 'none'*/
function createModals(person){
   let modals = document.createElement('DIV');
   modals.id = "modals"
   document.getElementById('gallery').parentElement.appendChild(modals);
   for(let i = 0; i < person.length; i++){ 
    modals.innerHTML +=`
                <div class="modal-container ${person[i].cell}modal">
                    <div class="modal">
                        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                        <div class="modal-info-container">
                            <img class="modal-img" src="${person[i].picture.medium}" alt="profile picture">
                            <h3 id="name" class="modal-name cap">${person[i].name.first} ${person[i].name.last}</h3>
                            <p class="modal-text">${person[i].email}</p>
                            <p class="modal-text cap">${person[i].location.city}</p>
                            <hr>
                            <p class="modal-text">${person[i].cell}</p>
                            <p class="modal-text">${person[i].location.street.number} ${person[i].location.street.name}, ${person[i].location.city}, ${person[i].location.state} ${person[i].location.postcode}</p>
                            <p class="modal-text">Birthday: ${person[i].dob.date.substr(5,2)}/${person[i].dob.date.substr(8,2)}/${person[i].dob.date.substr(0,4)}</p>
                        </div>
                    </div> 
                    <div class="modal-btn-container">
                        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                        <button type="button" id="modal-next" class="modal-next btn">Next</button>
                    </div>
                </div>`;
               hideModal(document.getElementsByClassName(`${person[i].cell}modal`)[0]);
    }
}

/*function to add behaviour to the modals
first gets all the cards and modals as arrays
then for all cards a click eventlistener is added so that the modal shows
for the close button on the modal click eventlistener is added so the modal hides
for the next and prev button the hide and show functions are also used
next behaviour is not added for last card and prev behaviour not for the first card*/
function addBehaviour(){
    let cards = document.getElementById('gallery').children;

    const modals = document.getElementById('modals').children;
    for(let i = 0; i<cards.length; i++){
       cards[i].addEventListener('click', (e) => showModal(modals[i]));      
       modals[i].children[0].children[0].addEventListener('click', () => hideModal(modals[i]));
       if(i !== 0){
            modals[i].children[1].children[0].addEventListener('click', () =>{
                hideModal(modals[i]);
                showModal(modals[i - 1]);
            });
       } else{
           modals[i].children[1].children[0].style.display = 'none';
       }
       if(i !== 11){
            modals[i].children[1].children[1].addEventListener('click', () =>{
                hideModal(modals[i]);
                showModal(modals[i + 1]);
            });
        } else{
            modals[i].children[1].children[1].style.display = 'none';
        }
   }
}

//function to add searchbar
//first right html is added to the page
//after that a event listener is added which makes sure 
// only the cards are displayed with a name containing the search input
// it is still possible to cycle through all the modals
function addSearchbar(){
const search = `
<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>
`;
document.querySelector('.search-container').innerHTML = search;

const searchButton = document.getElementById('search-submit');
const searchInput = document.getElementById('search-input');
const cards = document.getElementById('gallery').children;
const names = document.getElementsByClassName('card-name');

searchButton.addEventListener('click', () =>{
    for(let i = 0; i<cards.length; i++){
        if(names[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())){
            cards[i].style.display = 'block'
        } else{
            cards[i].style.display = 'none' 
        }
    }
});
}


//function to show object
function showModal(modal){
     modal.style.display = "block";
}

//function to hide object
function hideModal(modal){
    modal.style.display = "none";
}

