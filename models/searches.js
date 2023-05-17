import fs from 'fs'; 
import * as dotenv from 'dotenv'
dotenv.config()

import axios from 'axios';

export class Searches 
{
    historial = [];

    dbPath = './db/database.json';

    constructor() {
        this.loadDB();
    }

    get historyCapitalized() {
        return this.historial.map(place =>{
            let words = place.split(' ');
            words = words.map( w => p[0].toUpperCase() + p.substring(1) );

            return words.join(' ')
        })
    }

    get paramsMapbox() {
        return {
            proximity: 'ip',
            language: 'es',
            'access_token': process.env.MAPBOX_KEY
        }
    }

    get paramsOpenweather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric'
         }
    }

    async city(place = '') {
        try{
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();
            return resp.data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }))

        } catch (error) {
            return [];
        }

    }

    async placeWeather(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {lat, lon, ...this.paramsOpenweather}
            });

            const resp = await instance.get();
            const { weather, main } = resp.data

            return {
                temp: main.temp,
                max: main.temp_max,
                min: main.temp_min  ,    
                desc: weather[0].description
            }            
        } catch (error) {
            console.error(error)
        }
    }

    addHistory( place = '') {
        if(this.historial.includes(place.toLocaleLowerCase())){
            return;
        }
        this.historial = this.splice(0,5)

        this.historial.unshift(place.toLocaleLowerCase());

        this.saveDB();
    }

    saveDB(){
        const payload = {
            historial: this.historial
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    loadDB() {
        if(!fs.existsSync(this.dbPath)) {
            return null;
        }
        
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8'});
        const data = JSON.parse(info);
    
        this.historial = data.historial;
    }
}