///
// MeteoBot class
///
class MeteoBot {

    //Constructor
    constructor() {
        this.dateTime = new Date().toISOString();
    }

    //Recuperation de la temperature
    async getTemperature(lat, lon) {
        const apiUrl = `https://api.meteomatics.com/${this.dateTime}/t_2m:C/${lat},${lon}/json`;
        var response = await this.fetchWeather(apiUrl);
        return response + " degC";
    }

    //Recuperation de la precipitation
    async getPrecipitation(lat, lon) {
        const apiUrl = `https://api.meteomatics.com/${this.dateTime}/precip_1h:mm/${lat},${lon}/json`;
        var response = await this.fetchWeather(apiUrl);
        return response + " mm";
    }

    //Recuperation de la vitesse du vent
    async getWindSpeed(lat, lon) {
        const apiUrl = `https://api.meteomatics.com/${this.dateTime}/wind_speed_10m:mph/${lat},${lon}/json`;
        var response = await this.fetchWeather(apiUrl);
        return response + " mph";
    }

    //Methode d'appel à l'API
    async fetchWeather(apiUrl) {

        var headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa('esiea_dossantos_nicolas:o8X3b8e6KI'));

        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: headers
            })

            if (!response.ok) {
                return('Problème lors de la communication avec cette API');
            }

            var weatherData = await response.json();
            return weatherData.data[0].coordinates[0].dates[0].value;

        } catch (error) {
            console.error('Erreur lors de la récupération des données météo:', error);
            return null;
        }
    }
}

export default MeteoBot;