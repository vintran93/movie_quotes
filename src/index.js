const apiService = new ApiService() 
let main = document.getElementById('main') // 2 global variables to use everywhere else
let baseURL = 'http://localhost:3000'
const charactersContainer = document.getElementById('characters-container');

const init = () => { // turn on the application at start on index.js master brain of program / variable init is a function / anonymous func
    bindEventListeners()
}

// bindEventhandlers to buttons on page
function bindEventListeners() {
    document.getElementById('movie-form').addEventListener('click', displayCreateForm) // display movie form function after a click | chaining
    document.getElementById('movies').addEventListener('click', renderMovies) // calls renderMovies function after 'movies ID' clicked
}

// display list of movies from database
async function renderMovies() {
    const movies = await apiService.fetchMovies() // from APIservice
    main.innerHTML = "" // anything inside main HTML tag clear to empty string
    movies.forEach(movie => { // retrieve movies and loop through for every iteration of loop take 1 dataset from movies object store in movie to access info
        const newMovie = new Movie(movie)  // create newMovie class stored as newMovie
        main.innerHTML += newMovie.render() // main global variable take insides of main tag and invoke render function from newMovie object created
    })
    attachClicksToLinks()
}

// async function renderCharacters() {  
//     const characters = await apiService.fetchCharacters()
//     main.innerHTML = ""
//     characters.forEach(character => {
//         const newCharacter = new Character(character)
//         main.innerHTML += newCharacter.render()
//     })
// }

function displayCreateForm() {
    let formDiv = document.querySelector("#new-movie-form")
    let html = `
        <form id="movie-create-form">
            <label>Title:</label>
            <input type="text" id="title">
            <input type="submit">
        </form>
    `
    formDiv.innerHTML = html // storing formDiv into the closing tags of innerhtml
    document.querySelector('#movie-create-form').addEventListener('submit', createMovie) // eventlistener submit of form
}

function displayCharacterForm(e) { 

    let formDiv = document.querySelector("#add-character-div") 
    let html = `
        <form id="character-create-form">
            <br>
            <input type="hidden" id="movieId" value="${e.target.dataset.id}">
            <label>Name:</label>
            <input type="text" id="name">
            <label>Quote:</label>
            <input type="text" id="quote">
            <label>Image:</label>
            <input type="text" id="image">
            <input type="submit">
        </form>
    `
    formDiv.innerHTML = html

    document.querySelector('#character-create-form').addEventListener('submit', createCharacter)
    document.querySelector('#add-character-div').addEventListener('submit', (e) => {
        e.target.reset();
    });

}

async function createMovie(e) {
    e.preventDefault()
    // let main = document.getElementById('main')
    let movie = {
        title: e.target.querySelector("#title").value // event.target (submit button clicked) look for ID title given value
    }

    let data = await apiService.fetchCreateMovie(movie)
    let newMovie = new Movie(data) // newMovie varialbe set equal to new Movie(data) key word new passed in data variable
    main.innerHTML += newMovie.render() // keep what I have and add to bottom
    attachClicksToLinks()
    clearForm()
}

async function createCharacter(e) {
    e.preventDefault()

    const movieId = document.querySelector("#add-character").dataset.id
    let character = { 
        name: e.target.querySelector("#name").value,
        quote: e.target.querySelector("#quote").value,
        image: e.target.querySelector('#image').value,
        movie_id: movieId,
        likes: 0
    }

    let data = await apiService.fetchCreateCharacter(character)
    let newCharacter = new Character(data)
    charactersContainer += newCharacter.renderCharacter() 
    attachClicksToCreateCharacter()
}

// display individual character once clicked
async function displayCharacter(e) {
    let id = e.target.dataset.id
    const data = await apiService.fetchCharacter(id)
    const character = new Character(data)
    charactersContainer = character.renderCharacter()
    
}

async function displayMovie(id){
    const data = await apiService.fetchMovie(id)
    const movie = new Movie(data)
    main.innerHTML = movie.renderMovie()

    if (movie.characters) {
        movie.characters.forEach(character => {
            main.innerHTML += `
            <li>
            <a href="#" data-id="${character.id}" data-movie-id="${movie.id}" >${character.name} - ${character.quote} </a>
            </li>
            <br>
            <br>
            `
        })
        attachClicksToCharactersLinks()
    }
    document.getElementById('add-character').addEventListener('click', displayCharacterForm)
    
}

// function charactersInMovie() {
//     document.querySelectorAll("li a").length
// }


// function deleteCharacter(){
    
//     let characterId = parseInt(event.target.dataset.id) // turn string into integer

//     fetch(`${baseURL}/characters/${characterId}`, {
//         method: "DELETE"
//     })

//     this.location.reload()

// }

function deleteMovie(){
    // debugger;
    let movieId = parseInt(event.target.dataset.id) // turn string into integer

    fetch(`${baseURL}/movies/${movieId}`, {
        method: "DELETE"
    })

    this.location.reload()
    
}

function attachClicksToLinks() {
    const movies = document.querySelectorAll("li a")
    movies.forEach(movie => {
        movie.addEventListener('click', (e) => displayMovie(e.target.dataset.id))
    })
}

function attachClicksToCharactersLinks() {
    const characters = document.querySelectorAll("li a")
    characters.forEach(character => {
        character.addEventListener('click', displayCharacter)
    })
}

function attachClicksToCreateCharacter() {
    const characters = document.querySelectorAll("li a")
    characters.forEach(character => {
        character.addEventListener('click', displayCharacter)
    })
}

function clearForm() {
    let formDiv = document.querySelector('#new-movie-form')
    formDiv.innerHTML = ""
}

init() // start whole process