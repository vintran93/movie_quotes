class ApiService {
    constructor() {
        this.baseURL = 'http://localhost:3000'
    } 

    async fetchMovies() {
        let res = await fetch(this.baseURL + '/movies')
        let data = await res.json()
        return data
    }

    async fetchMovie(id) {
        let res = await fetch(this.baseURL + `/movies/${id}`)
        let data = await res.json()
        return data
    }

    async fetchCharacter(id) {
        let res = await fetch(this.baseURL + `/characters/${id}`)
        let data = await res.json()
        return data
    }

    async fetchCreateMovie(movieData) {

        let configObj = {
            method: 'POST',
            body: JSON.stringify(movieData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        let res = await fetch(this.baseURL + `/movies`, configObj)
        let data = await res.json()
        return data
    }

    async fetchCreateCharacter(characterData) {
        let configObj = {
            method: 'POST',
            body: JSON.stringify(characterData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        let res = await fetch(this.baseURL + '/characters', configObj)
        let data = await res.json()
        return data
    }

    async fetchRemoveCharacter(id) {
        let configObj = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        let res = await fetch(this.baseURL + `/characters/${id}`, configObj)
    }

    async fetchRemoveMovie(id) {
        let configObj = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        let res = await fetch(this.baseURL + `/movies/${id}`, configObj)
    }

}
