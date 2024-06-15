///
// JokeBot class
///
class JokeBot {

    //Constructor
    constructor() {}

    //R�cup�ration d'une blague al�atoire
    async getRandomJoke() {
        const url = `https://v2.jokeapi.dev/joke/Any`;
        return this.fetchJoke(url);
    }

    //R�cup�ration d'une blague programming
    async getProgrammingJoke() {
        const url = `https://v2.jokeapi.dev/joke/Any?type=programming`;
        return this.fetchJoke(url);
    }

    //R�cup�ration d'une blague dark
    async getDarkJoke() {
        const url = `https://v2.jokeapi.dev/joke/Any?type=dark`;
        return this.fetchJoke(url);
    }

    //M�thode d'appel � l'API
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
                return ('Probl�me lors de la communication avec cette API');
            }
            var jokeData = await response.json();

            if (jokeData.error) {
                return ('Probl�me lors de la communication avec cette API');
            }
            if (jokeData.type === 'twopart') {
                return `${jokeData.setup} ${jokeData.delivery}`;
            }
            else{
                return ('Probl�me lors de la communication avec cette API');
            }
        } catch (error) {
            console.error('Erreur lors de la r�cup�ration de la blague:', error);
            return null;
        }
    }
}

export default JokeBot;
