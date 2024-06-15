///
// JokeBot class
///
class JokeBot {

    //Constructor
    constructor() {}

    //Récupération d'une blague aléatoire
    async getRandomJoke() {
        const url = `https://v2.jokeapi.dev/joke/Any`;
        return this.fetchJoke(url);
    }

    //Récupération d'une blague programming
    async getProgrammingJoke() {
        const url = `https://v2.jokeapi.dev/joke/Any?type=programming`;
        return this.fetchJoke(url);
    }

    //Récupération d'une blague dark
    async getDarkJoke() {
        const url = `https://v2.jokeapi.dev/joke/Any?type=dark`;
        return this.fetchJoke(url);
    }

    //Méthode d'appel à l'API
    async fetchJoke(url) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            });
            if (!response.ok) {
                return ('Problème lors de la communication avec cette API');
            }
            var jokeData = await response.json();

            if (jokeData.error) {
                return ('Problème lors de la communication avec cette API');
            }
            if (jokeData.type === 'twopart') {
                return `${jokeData.setup} ${jokeData.delivery}`;
            }
            else{
                return ('Problème lors de la communication avec cette API');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération de la blague:', error);
            return null;
        }
    }
}

export default JokeBot;
