
document.querySelector('.header-text-container').innerHTML = "<h1>Loading...</h1>";
Promise.all(
    [
    fetchData('https://randomuser.me/api/'),
    fetchData('https://randomuser.me/api/'),
    fetchData('https://randomuser.me/api/'),
    fetchData('https://randomuser.me/api/'),
    fetchData('https://randomuser.me/api/'),
    fetchData('https://randomuser.me/api/'),
    fetchData('https://randomuser.me/api/'),
    fetchData('https://randomuser.me/api/'),
    fetchData('https://randomuser.me/api/'),
    fetchData('https://randomuser.me/api/'),
    fetchData('https://randomuser.me/api/'),
    fetchData('https://randomuser.me/api/')
])
.then(response => response.map(data => data.results[0]))
.then(data =>{
createCards(data);
createModals(data);
addBehaviour();
})
.finally(()=>document.querySelector('.header-text-container').innerHTML = "<h1>AWESOME STARTUP EMPLOYEE DIRECTORY</h1>")
.catch(err => {
    Error('failed to load');
    document.querySelector('.header-text-container').innerHTML = "<h1>Failed to load site! Sorry...</h1>";
});


function fetchData(url){
   return fetch(url)
          .then(response => response.json());

}

function createCards(person){
    console.log(person)
  let cards = ''; 
  for(let i = 0; i < person.length; i++){ 
    cards += `
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
  }
  document.getElementById('gallery').innerHTML = cards;
}

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
                document.getElementsByClassName(`${person[i].cell}modal`)[0].style.display = 'none';
    }
}


function addBehaviour(){
    const cards = document.getElementById('gallery').children;
    const modals = document.getElementById('modals').children;
    for(let i = 0; i<cards.length; i++){
       cards[i].addEventListener('click', (e) => showModal(modals[i]));      
       modals[i].children[0].children[0].addEventListener('click', () => hideModal(modals[i]));
       if(i !== 0){
            modals[i].children[1].children[0].addEventListener('click', () =>{
                hideModal(modals[i]);
                showModal(modals[i - 1])
            });
       }
       if(i !== 11){
        modals[i].children[1].children[1].addEventListener('click', () =>{
            hideModal(modals[i]);
            showModal(modals[i + 1])
        });
   }

    }
}

function showModal(modal){
     modal.style.display = "block";
     console.log(modal);
}

function hideModal(modal){
    modal.style.display = "none";
    console.log(modal);
}

