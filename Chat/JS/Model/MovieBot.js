///
// MovieBot class
///
class MovieBot {

    //Constructor
    constructor() {
        this.apiKey = 'fa555c834f8fbb12edd7cf0c196d637f';
    }

    //Récupération des films populaires
    async getPopularMovies() {
        const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=fr-FR`;
        return this.fetchMovies(apiUrl);
    }

    //Récupération des films les mieux notées
    async getTopRatedMovies() {
        const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=fr-FR`;
        return this.fetchMovies(apiUrl);
    }

    //Récupérations des film à venir
    async getUpcomingMovies() {
        const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiKey}&language=fr-FR`;
        return this.fetchMovies(apiUrl);
    }

    //Méthode d'appel à l'API
    async fetchMovies(apiUrl) {
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            });

            if (!response.ok) {
                return ('Problème lors de la communication avec cette API');
            }

            var movieData = await response.json();
            return this.formatString(movieData.results);
        } catch (error) {
            console.error('Erreur lors de la récupération des données de film:', error);
            return null;
        }
    }

    //Formatage du string pour retourner le titre et joindre les différents results
    formatString(movies) {
        return movies.map(movie => movie.title).join(' / ');
    }
}

export default MovieBot;
